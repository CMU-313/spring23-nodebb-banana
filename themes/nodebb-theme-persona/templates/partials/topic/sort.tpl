<div title="[[topic:sort_by]]" class="btn-group bottom-sheet hidden-xs" component="thread/sort">
    <button class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" type="button">
    <span><i class="fa fa-fw fa-sort"></i></span></button>
    <ul class="dropdown-menu dropdown-menu-right">
        <li><a href="#" class="oldest_to_newest" data-sort="oldest_to_newest"><i class="fa fa-fw"></i> [[topic:oldest_to_newest]]</a></li>
        <li><a href="#" class="newest_to_oldest" data-sort="newest_to_oldest"><i class="fa fa-fw"></i> [[topic:newest_to_oldest]]</a></li>
        <li><a href="#" class="most_votes" data-sort="most_votes"><i class="fa fa-fw"></i> [[topic:most_votes]]</a></li>
        {{{each tagItems}}}
        <li role="presentation" class="tag {{{ if ../disabledClass }}}disabled{{{ end }}}" data-cid="{../cid}" data-parent-cid="{../parentCid}" data-name="{../name}">
            <a role="menu-item" href="#">{../level}<i component="category/select/icon" class="fa fa-fw fa-check {{{ if !../selected }}}invisible{{{ end }}}"></i><span component="category-markup" style="{{{ if ../match }}}font-weight: bold;{{{end}}}">{{{ if ../icon }}}<span class="fa-stack" style="{function.generateCategoryBackground}"><i class="fa fa-fw fa-stack-1x {../icon}" style="color: {../color};"></i></span>{{{ end }}} {../name}</span></a>
        </li>
        {{{end}}}
    </ul>
</div>
