# Team Banana - User Guide
An overview of our implemented features and how to run/user test them

## Mark as resolved:
The ‘Mark As Resolved’ functionality allows users to mark specific posts or questions as resolved, which can serve as indications for others that no further assistance is required. An interactive “mark as resolved” button is displayed in the dropdown menu bar of each post’s interface. By clicking the button, users can change the status of the post either from unresolved to resolved or resolved to unresolved. The status change of the posts is supported by backend implementation. In particular, every time the button is clicked, the change is stored and preserved for the next view. 

User testing for the feature can be performed through direct interaction with the NodeBB interface. 
### Building
To first build files after installation: 
% ./nodebb build 
Then start the NodeBB server:
% ./nodebb start 
After the server is started, visit the forum at http://localhost:4567/

### Tests
To test the “Mark As Resolved” button, navigate to the page of a specific post. In the bottom-right corner, open the post menu bar, which is displayed as three dots on the interface. When clicking on the button, the status of the post should change as indicated by the change in the icon. Exit the current post page and reenter to see the status has been updated and preserved. 

The automated tests for the feature are stored in test/posts.js. The tests validate and check for backend functionality of the “Mark As Resolved” feature, in particular, functions implemented in file src/posts/resolve.ts. Passing the tests serves as a good indication of post status being successfully updated and stored in the database regardless of displays in the front end. The tests are sufficient to reflect the performance and functionality of the “Mark As Resolved” implementation since it fully captures and assesses the fundamental purposes of the new feature. 

## Tag Filtering using Dropdown Menu:
To filter through topics by tag on the ‘Recent’ tab, click on the button that says ‘All Tags’ on the very right side of the navigation bar. It will reveal a dropdown menu that shows all created tags. If you have not created any tags, a message will show, stating that no tags have been created. A button at the bottom of the dropdown menu, when clicked, will take you to the ‘Tags’ tab.

Automated tests can be found within the tests/tags.js file. Which tests the basic functionality of tags and its features.

## Poll Plugin Usage:
The nodebb-plugin-poll-git in the repository is a plugin that provides a poll function for new posts. It allows poll creators to set options, number of votes per person, and the end date of poll. It allows viewers to vote and provides visualized statistics for poll results.


### To use the plugin:
       1) nodebb needs to be set and built successfully
       2) Add this nodebb-plugin-poll-git into the node_modules file; the name of it should be changed into nodebb-plugin-poll; note that the prefix must be nodebb-plugin-xxx or the plugin cannot be successfully installed. (The nodebb-plugin-poll-git is for git actions when the real poll plug in was being edited and cannot be directly used)
       3) run
           ./nodebb install nodebb-plugin-poll
       4) log in as an admin and activate this poll plugin by the plugin button in the admin dashboard.

### Tests:
   1) User test:
       One can try to create a new post and can see that the poll option stays together with other widgets like link/image/emoji if the plugin is successfully installed.


   2) Automated test:
       The automated tests can be found within nodebb-plugin-poll-git/.eslintrc. What is being tested is in the comments which basically test general functionality of poll plugin and prevent some illegal operations.
       Some tests come from the ./eslintrc file of the official Nodebb poll plugin, and the remaining are added to prevent some possible unexpected operation. Combining with the user tests, these automated tests should be more than enough to use.
