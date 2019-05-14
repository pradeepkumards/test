# Project Title (FSD-Final-Assignment)

This is a MEAN Stack application for Notes. 


## Project Features: 
```
* Register New Users by providing details such as name, email ID along with credentials

* Registered user, should be able to login, logout 

* Add (Or) update (Or) delete Notes

* List Notes

* Creating a Group

* Add/Remove Notes to a Group

* Add Notes as Favourites

* Share notes with other Users

* Set reminders on a note

* Push Notification alerts
```

## Steps to run the Project
```
> `docker-compose build`

> `docker-compose up`

> Once docker container is started application can be accessed at `http://localhost:3000`
```

## Example urls to test the project

### Users

1.Register user - POST 

```
http://localhost:3000/api/v1/users/register
```
```
Request Body - JSON :
{
    "name":"Saravana",
    "emailId":"saravana.dhandapani@cognizant.com",
    "password":"password"
}
```
```
Response Body - JSON :
{
    "response": {
        "sharedNotes": [],
        "_id": "5c067fe69e72721594ac6e63",
        "createdOn": "2018-12-04T13:23:50.612Z",
        "modifiedOn": "2018-12-04T13:23:50.612Z",
        "userId": "eef4a43c-55da-4e95-93ce-1ddbeb898e2b",
        "name": "Leela",
        "emailId": "leela.konda@cognizant.com",
        "password": "$2a$10$CB7eqphpj30NyXYQHoFQUO2oSVtsoQoFSmAW3ClCtalIKhj25tYxi",
        "__v": 0
    },
    "message": "User added successfully."
}
```


2.Login user - POST

```
http://localhost:3000/api/v1/users/login
```
```
Request Body - JSON :
{
    "emailId":"leela.konda@cognizant.com",
    "password":"password"
}
```
```
Response Body - JSON :
{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0ZWJmODY2LTExNzEtNDgxMy04MjRmLWY0MDMyNTZlZGMzZiIsIm5hbWUiOiJMZWVsYSIsImVtYWlsIjoibGVlbGEua29uZGFAY29nbml6YW50LmNvbSIsImlhdCI6MTU0NDAyNTE5OSwiZXhwIjoxNTQ0MDI4Nzk5fQ.QxlDnKM4X9Gafa6Tg-IZGxvtGvE4qmTHMxLSlYziPWE
}
```

3.Logout user - Post

```
http://localhost:3000/api/v1/users/logout
```
```
Response Body - JSON :
{
    "message": "you logged out"
}
```


### Notes 

4.Add note - POST - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/notes
```
```
Request Body - JSON :
{
    "title":"Meeting Reminder",
    "description":"Meet Sister",
    "isFavourite":false,
    "startDateTime":"2018-01-01",
    "endDateTime":"2018-12-31",
    "frequency":"daily"
}
```
```
Response Body - JSON :
{
    "message": "Note added successfully."
}
```

5.Update note - PUT - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/notes/ccfc5d69-fb43-4926-8c9b-07553c51f316
```
```
Request Body - JSON :
{
    "title":"Meeting Reminder",
    "description":"Meet Sister",
    "isFavourite":true,
    "startDateTime":"2018-11-01",
    "endDateTime":"2018-12-30",
    "frequency":"monthly"
}
```
```
Response Body - JSON :
{
    "message": "Note updated successfully."
}
``` 

6.Delete note - DELETE - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/notes/ccfc5d69-fb43-4926-8c9b-07553c51f316
```
```
Response Body - JSON :
{
    "message": "Note deleted successfully."
}
```

7.Get note by noteId - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/notes/ccfc5d69-fb43-4926-8c9b-07553c51f316
```
```
Response Body - JSON :
{
    "description": "Meet Sister",
    "isFavourite": true,
    "_id": "5c079220ebc8f75328cd36b7",
    "sharedNotes": [],
    "createdOn": "2018-12-05T08:53:52.591Z",
    "modifiedOn": "2018-12-05T08:53:52.591Z",
    "noteId": "ccfc5d69-fb43-4926-8c9b-07553c51f316",
    "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
    "title": "Meeting Reminder",
    "__v": 0
}
```

8.Get All notes - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/notes
```
```
Response Body - JSON :
[
    {
        "_id": "5c079220ebc8f75328cd36b7",
        "description": "Meet Sister",
        "isFavourite": true,
        "sharedNotes": [
            {
                "userRole": "FULL",
                "_id": "5c07e8c252e00865306d2c9a",
                "userId": "64394b58-95d5-489f-b395-a42ec7665df9"
            }
        ],
        "createdOn": "2018-12-05T08:53:52.591Z",
        "modifiedOn": "2018-12-05T08:53:52.591Z",
        "noteId": "ccfc5d69-fb43-4926-8c9b-07553c51f316",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Meeting Reminder",
        "__v": 0,
        "role": "SELF"
    },
    {
        "_id": "5c079af066b5c04238237d64",
        "description": "Mom Birthday",
        "isFavourite": false,
        "sharedNotes": [],
        "createdOn": "2018-12-05T09:31:28.680Z",
        "modifiedOn": "2018-12-05T09:31:28.681Z",
        "noteId": "38b8a1f3-df49-4927-9542-b99f9c2e0845",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Birthday Reminder",
        "__v": 0,
        "role": "SELF"
    }
]
```

9.Toogle note favourite status - POST - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/notes/favourite/38b8a1f3-df49-4927-9542-b99f9c2e0845
```
```
Response Body - JSON :
{
    "response": {
        "description": "Mom Birthday",
        "isFavourite": true,
        "_id": "5c079af066b5c04238237d64",
        "sharedNotes": [],
        "createdOn": "2018-12-05T09:31:28.680Z",
        "modifiedOn": "2018-12-05T09:31:28.681Z",
        "noteId": "38b8a1f3-df49-4927-9542-b99f9c2e0845",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Birthday Reminder",
        "__v": 0
    },
    "message": "Note toggled successfully."
}
```

10.Search Notes with title - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/notes?title=Meeting Reminder
```
```
Response Body - JSON :
[
    {
        "_id": "5c079220ebc8f75328cd36b7",
        "description": "Meet Sister",
        "isFavourite": true,
        "sharedNotes": [],
        "createdOn": "2018-12-05T08:53:52.591Z",
        "modifiedOn": "2018-12-05T08:53:52.591Z",
        "noteId": "ccfc5d69-fb43-4926-8c9b-07553c51f316",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Meeting Reminder",
        "__v": 0,
        "role": "SELF"
    }
]
```

11.Search Notes with favourite true/false - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/notes?favourite=true
```
```
Response Body - JSON :
[
    {
        "_id": "5c079220ebc8f75328cd36b7",
        "description": "Meet Sister",
        "isFavourite": true,
        "sharedNotes": [
            {
                "userRole": "FULL",
                "_id": "5c07e8c252e00865306d2c9a",
                "userId": "64394b58-95d5-489f-b395-a42ec7665df9"
            }
        ],
        "createdOn": "2018-12-05T08:53:52.591Z",
        "modifiedOn": "2018-12-05T08:53:52.591Z",
        "noteId": "ccfc5d69-fb43-4926-8c9b-07553c51f316",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Meeting Reminder",
        "__v": 0,
        "role": "SELF"
    },
    {
        "_id": "5c079af066b5c04238237d64",
        "description": "Mom Birthday",
        "isFavourite": true,
        "sharedNotes": [],
        "createdOn": "2018-12-05T09:31:28.680Z",
        "modifiedOn": "2018-12-05T09:31:28.681Z",
        "noteId": "38b8a1f3-df49-4927-9542-b99f9c2e0845",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Birthday Reminder",
        "__v": 0,
        "role": "SELF"
    },
    {
        "_id": "5c079b6ba02f6d37c8045482",
        "description": "Cook Food",
        "isFavourite": true,
        "sharedNotes": [],
        "createdOn": "2018-12-05T09:33:31.620Z",
        "modifiedOn": "2018-12-05T09:33:31.620Z",
        "noteId": "15d1750e-bd54-4f93-a29c-56fa2ea92f4a",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Cooking Reminder",
        "__v": 0,
        "role": "SELF"
    }
]
```

12.Share note to other user - POST - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/notes/share/ccfc5d69-fb43-4926-8c9b-07553c51f316/konda.leela28@gmail.com/FULL
```
```
Response Body - JSON :
{
    "message": "Note shared successfully."
}
```

### Groups

13.Add New Group - POST - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/groups
```
```
Request Body - JSON :
{
	"title":"Friends Group",
	"description":"Group to represent friends.",
	"notes":["ccfc5d69-fb43-4926-8c9b-07553c51f316"]
}
```
```
Response Body - JSON :
{
    "response": {
        "description": "Group to represent friends.",
        "notes": [
            "ccfc5d69-fb43-4926-8c9b-07553c51f316"
        ],
        "_id": "5c08e84976b7e9637c6ed8b6",
        "createdOn": "2018-12-06T09:13:45.121Z",
        "modifiedOn": "2018-12-06T09:13:45.121Z",
        "groupId": "05fa5507-4c6e-4b62-9d14-89a8488815ba",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Friends Group",
        "__v": 0
    },
    "message": "Group added sucessfully."
}
```

14.Update Group - PUT - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/groups/05fa5507-4c6e-4b62-9d14-89a8488815ba
```
```
Request Body - JSON :
{
	"title":"Friends Group",
	"description":"Group to represent best friends."
}
```
```
Response Body - JSON :
{
    "response": {
        "description": "Group to represent best friends.",
        "notes": [],
        "_id": "5c0fc22845c3fb49b45dfdc4",
        "createdOn": "2018-12-11T13:56:56.763Z",
        "modifiedOn": "2018-12-11T13:56:56.763Z",
        "groupId": "4eaf809e-debd-4065-8f00-e2cbc8f548da",
        "userId": "af30a670-a98b-46ad-ab5c-62d7de2a16c3",
        "title": "Friends Group",
        "__v": 0
    },
    "message": "Group updated successfully."
}
```
15.Delete Group - DELETE - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/groups/05fa5507-4c6e-4b62-9d14-89a8488815ba
```
```
Response Body - JSON :
{
    "response": {
        "description": "Group to represent best friends.",
        "notes": [],
        "_id": "5c0fc22845c3fb49b45dfdc4",
        "createdOn": "2018-12-11T13:56:56.763Z",
        "modifiedOn": "2018-12-11T13:56:56.763Z",
        "groupId": "4eaf809e-debd-4065-8f00-e2cbc8f548da",
        "userId": "af30a670-a98b-46ad-ab5c-62d7de2a16c3",
        "title": "Friends Group",
        "__v": 0
    },
    "message": "Group deleted successfully."
}
```
16.Add Note to Group - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/groups/addNote/05fa5507-4c6e-4b62-9d14-89a8488815ba?noteId=38b8a1f3-df49-4927-9542-b99f9c2e0845
```
```
Response Body - JSON :
{
    "response": {
        "description": "Group to represent friends.",
        "notes": [
            "ccfc5d69-fb43-4926-8c9b-07553c51f316",
            "38b8a1f3-df49-4927-9542-b99f9c2e0845"
        ],
        "_id": "5c08e84976b7e9637c6ed8b6",
        "createdOn": "2018-12-06T09:13:45.121Z",
        "modifiedOn": "2018-12-06T09:13:45.121Z",
        "groupId": "05fa5507-4c6e-4b62-9d14-89a8488815ba",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Friends Group",
        "__v": 0
    },
    "message": "Added note to group successfully."
}
```

17.Remove Note from Group - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/groups/removeNote/05fa5507-4c6e-4b62-9d14-89a8488815ba?noteId=38b8a1f3-df49-4927-9542-b99f9c2e0845
```
```
Response Body - JSON :
{
    "response": {
        "description": "Group to represent friends.",
        "notes": [
            "ccfc5d69-fb43-4926-8c9b-07553c51f316"
        ],
        "_id": "5c08e84976b7e9637c6ed8b6",
        "createdOn": "2018-12-06T09:13:45.121Z",
        "modifiedOn": "2018-12-06T09:13:45.121Z",
        "groupId": "05fa5507-4c6e-4b62-9d14-89a8488815ba",
        "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
        "title": "Friends Group",
        "__v": 0
    },
    "message": "Removed note from group successfully."
}
```

18.Get All Groups - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/groups
```
```
Response Body - JSON :
[
    {
        "description": "Group to represent collegues.",
        "notes": [
            "086f6677-e869-4010-84d0-aa951c577911"
        ],
        "_id": "5c0f80f47201d450443b6fff",
        "createdOn": "2018-12-11T09:18:44.689Z",
        "modifiedOn": "2018-12-11T09:18:44.689Z",
        "groupId": "ed6da4ba-f995-4568-acdd-45d5c04f0a37",
        "userId": "af30a670-a98b-46ad-ab5c-62d7de2a16c3",
        "title": "Collegues Group",
        "__v": 0
    },
    {
        "description": "Group to represent friends.",
        "notes": [],
        "_id": "5c0fc22845c3fb49b45dfdc4",
        "createdOn": "2018-12-11T13:56:56.763Z",
        "modifiedOn": "2018-12-11T13:56:56.763Z",
        "groupId": "4eaf809e-debd-4065-8f00-e2cbc8f548da",
        "userId": "af30a670-a98b-46ad-ab5c-62d7de2a16c3",
        "title": "Friends Group",
        "__v": 0
    }
]
```

19.Get Group By GroupId - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/groups/05fa5507-4c6e-4b62-9d14-89a8488815ba
```
```
Response Body - JSON :
{
    "description": "Group to represent friends.",
    "notes": [
        "ccfc5d69-fb43-4926-8c9b-07553c51f316",
        "9007e38e-6144-45b5-86e5-cc760cccfb61"
    ],
    "_id": "5c08e84976b7e9637c6ed8b6",
    "createdOn": "2018-12-06T09:13:45.121Z",
    "modifiedOn": "2018-12-06T09:13:45.121Z",
    "groupId": "05fa5507-4c6e-4b62-9d14-89a8488815ba",
    "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
    "title": "Friends Group",
    "__v": 0
}
```

20.Get Group By Group Title - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/groups/title/Family Group
```
```
Response Body - JSON :
{
    "description": "Group to represent family members.",
    "notes": [],
    "_id": "5c08e7f776b7e9637c6ed8b5",
    "createdOn": "2018-12-06T09:12:23.010Z",
    "modifiedOn": "2018-12-06T09:12:23.010Z",
    "groupId": "64523bbc-5bc6-4f11-a800-ccdb87f1fd3d",
    "userId": "b4ebf866-1171-4813-824f-f403256edc3f",
    "title": "Family Group",
    "__v": 0
}
```

### Reminders 

21.Add Reminder to a Note - POST - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/reminders/3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf
```
```
Request Body - JSON :
{
	"startDateTime":"2018-01-01",
    "endDateTime":"2018-12-15",
    "frequency":"daily"
}
```
```
Response Body - JSON :
{
    "response": {
        "frequency": "daily",
        "lastReminder": null,
        "nextReminder": null,
        "snoozeTime": null,
        "status": "",
        "_id": "5c0fa52b16334d17dc9642f1",
        "createdOn": "2018-12-11T11:53:15.928Z",
        "modifiedOn": "2018-12-11T11:53:15.928Z",
        "reminderId": "c751947f-5095-4c62-a637-3b2dc013ecb0",
        "noteId": "3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf",
        "userId": "af30a670-a98b-46ad-ab5c-62d7de2a16c3",
        "startDateTime": "2018-01-01T00:00:00.000Z",
        "endDateTime": "2018-12-15T00:00:00.000Z",
        "__v": 0
    },
    "message": "Reminder added sucessfully."
}
```

22.Update Reminder - PUT - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/reminders/3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf
```
```
Request Body - JSON :
{
	"startDateTime":"2018-01-01",
    "endDateTime":"2018-12-15",
    "frequency":"monthly"
}
```
```
Response Body - JSON :
{
    "response": {
        "frequency": "monthly",
        "lastReminder": null,
        "nextReminder": null,
        "snoozeTime": null,
        "status": "",
        "_id": "5c0fa48416334d17dc9642ee",
        "createdOn": "2018-12-11T11:50:28.616Z",
        "modifiedOn": "2018-12-11T11:50:28.616Z",
        "reminderId": "c4229c77-7e6e-4ffb-b6e6-f60a3578908b",
        "noteId": "3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf",
        "userId": "af30a670-a98b-46ad-ab5c-62d7de2a16c3",
        "startDateTime": "2018-01-01T00:00:00.000Z",
        "endDateTime": "2018-12-15T00:00:00.000Z",
        "__v": 0
    },
    "message": "Reminder updated successfully."
}
``` 

23.Delete Reminder - DELETE - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/reminders/3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf
```
```
Response Body - JSON :
{
    "response": {
        "frequency": "monthly",
        "lastReminder": null,
        "nextReminder": null,
        "snoozeTime": null,
        "status": "",
        "_id": "5c0fa48d16334d17dc9642ef",
        "createdOn": "2018-12-11T11:50:37.135Z",
        "modifiedOn": "2018-12-11T11:50:37.135Z",
        "reminderId": "31488e0f-35bb-4b11-b363-33fee024ce3c",
        "noteId": "3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf",
        "userId": "af30a670-a98b-46ad-ab5c-62d7de2a16c3",
        "startDateTime": "2018-01-01T00:00:00.000Z",
        "endDateTime": "2018-12-31T00:00:00.000Z",
        "__v": 0
    },
    "message": "Reminder deleted successfully."
}
```

24.Get Reminder by noteId - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/reminders/3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf
```
```
Response Body - JSON :
{
    "frequency": "monthly",
    "lastReminder": null,
    "nextReminder": null,
    "snoozeTime": null,
    "status": "",
    "_id": "5c0fa51b16334d17dc9642f0",
    "createdOn": "2018-12-11T11:52:59.145Z",
    "modifiedOn": "2018-12-11T11:52:59.145Z",
    "reminderId": "12c5aa38-941c-4a56-b718-e62da4212b9c",
    "noteId": "3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf",
    "userId": "af30a670-a98b-46ad-ab5c-62d7de2a16c3",
    "startDateTime": "2018-01-01T00:00:00.000Z",
    "endDateTime": "2018-12-31T00:00:00.000Z",
    "__v": 0
}
```

25.Update reminder status - GET - with Authentication (Pass JWT token from Login response)

```
http://localhost:3000/api/v1/reminders/3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf/SNOOZE
```
```
Response Body - JSON :
{
    "response": {
        "frequency": "monthly",
        "lastReminder": null,
        "nextReminder": null,
        "snoozeTime": null,
        "status": "SNOOZE",
        "_id": "5c0fa48416334d17dc9642ee",
        "createdOn": "2018-12-11T11:50:28.616Z",
        "modifiedOn": "2018-12-11T11:50:28.616Z",
        "reminderId": "c4229c77-7e6e-4ffb-b6e6-f60a3578908b",
        "noteId": "3d5c31b7-5587-46d3-b6e9-3d4d46a69bbf",
        "userId": "af30a670-a98b-46ad-ab5c-62d7de2a16c3",
        "startDateTime": "2018-01-01T00:00:00.000Z",
        "endDateTime": "2018-12-15T00:00:00.000Z",
        "__v": 0
    },
    "message": "Reminder updated successfully."
}
``` 
