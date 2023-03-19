'use strict';

const db = require('../database');
const plugins = require('../plugins');

module.exports = function (Posts) {
    function toggleResolve(type, pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parseInt(uid, 10) <= 0) {
                throw new Error('[[error:not-logged-in]]');
            }
            const isResolving = type === 'resolve';
            const [postData, hasResolved] = yield Promise.all([
                Posts.getPostFields(pid, ['pid', 'uid']),
                Posts.hasResolved(pid, uid),
            ]);
            if (isResolving && hasResolved) {
                throw new Error('[[error:already-resolved]]');
            }
            if (!isResolving && !hasResolved) {
                throw new Error('[[error:already-unresolved]]');
            }
            if (isResolving) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                yield database_1.default.sortedSetAdd(`uid:${uid}:resolve`, Date.now(), pid);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                yield database_1.default.sortedSetRemove(`uid:${uid}:resolve`, pid);
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            yield database_1.default[isResolving ? 'setAdd' : 'setRemove'](`pid:${pid}:users_resolved`, uid);
            yield plugins_1.default.hooks.fire(`action:post.${type}`, {
                pid: pid,
                uid: uid,
                owner: postData.uid,
                current: hasResolved ? 'resolved' : 'unresolved',
            });
            return {
                post: postData,
                isResolved: isResolving,
            };
        });
    }
    Posts.resolve = function (pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield toggleResolve('resolve', pid, uid);
        });
    };
    Posts.unresolve = function (pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield toggleResolve('unresolve', pid, uid);
        });
    };
    Posts.hasResolved = function (pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parseInt(uid, 10) <= 0) {
                return Array.isArray(pid) ? pid.map(() => false) : false;
            }
            if (Array.isArray(pid)) {
                const sets = pid.map(pid => `pid:${pid}:users_resolved`);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                const returnBool = yield database_1.default.isMemberOfSets(sets, uid);
                return returnBool;
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            const returnVal = yield database_1.default.isSetMember(`pid:${pid}:users_resolved`, uid);
            return returnVal;
        });
    };
};