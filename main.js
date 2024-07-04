//submits issue to saveIssue() when submit button is clicked
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

//function to save issue to local storage, .value to get input value
function saveIssue(e) {
    //every input field needs assigned to a variable
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    //uses chance to generate a global issue id, this is the function of using chance in the project
    let issueId = chance.guid();
    //issue status set to open, as opposed to closed
    let issueStatus = 'Open';
    
    //structures the issue object
    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

//if there are no issues...
    if(localStorage.getItem('issues') == null) {
        //set issues empty
        let issues = [];
        //push the issue to the array
        issues.push(issue);
        //input issues in issue array and convert to JSON 
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        //if there are issues, pull that JSON and push the new issue to the array
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
//resets the form after submission
    document.getElementById('issueInputForm').reset();
//regenerates the issue list with any new issues added now
    fetchIssues();

//prevents the form from submitting by default (automatically);
    e.preventDefault();
}

//close button functionality
function setStatusClosed(id) {
//first grab the issues from local storage
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i=0; i<issues.length; i++) {
        //if issue in array has same id as the id of issue closed button was clicked for 
        if (issues[i].id == id)
            //set the status of issue of that id to closed
            issues[i].status = 'Closed';
    }
//reestablishes the issues array with the new status
    localStorage.setItem('issues', JSON.stringify(issues));
//repopulates the issue list on website, now with updated status
    fetchIssues();
}

function deleteIssue(id){
    //first grab the issues from local storage
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i=0; i<issues.length; i++) {
        //if issue in array has same id as the id of issue delete button was clicked for 
        if (issues[i].id == id)
            //delete the issue of that id, at that index and removes 1 item
            issues.splice(i, 1);
    }
//reestablishes the issues array with the new status
    localStorage.setItem('issues', JSON.stringify(issues));
//repopulates the issue list on website, now with updated status
    fetchIssues();
}
    
//function that pulls up all issues in storage and populates on webpage
function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');
//establishes issues array as empty to start
    issuesList.innerHTML = '';
//iterates over issues array
    if(issues === null) {
        alert('No issues to display');
    }else{

        for (let i=0; i<issues.length; i++) {
            //variables to store array data
            let id = issues[i].id;
            let desc = issues[i].description;
            let severity = issues[i].severity;
            let assignedTo = issues[i].assignedTo;
            let status = issues[i].status;

            //populates html with issue data from JSON array
            issuesList.innerHTML += '<div class="well">' +
                                    '<h6>Issue ID: ' + id + "</h6>" +
                                    '<p><span class="label label-info">' + status + '</span</p>' +
                                    '<h3>' + desc + '</h3>' +
                                    '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
                                    '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
                                    '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning" style="margin-right: 5px">Close</a>' +
                                    '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                                    '</div>';
        }
    }
}