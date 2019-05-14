# Data model

### Users 

```
{
  userId      : String,              
  name        : String,
  emailId     : String,
  password    : String,
  sharedNotes : Array<String>,
  createdOn   : Date,
  modifiedOn  : Date
} 
```

### Notes

```
{
  noteId      : String,
  userId      : String,
  title       : String,
  description : String
  isFavourite : Boolean,  
  sharedNotes : [{           
    userId: String,
    userRole: String
  }],
  createdOn   : Date,
  modifiedOn  : Date
}
```

### Groups

```
{
  groupId     : String,
  userId      : String,
  title       : String,
  description : String,
  groupIcon   : String,
  notes       : Array<String>, 
  createdOn   : Date,
  modifiedOn  : Date       
}
```

### Reminders

```
{
  reminderId     : String,
  noteId         : String,
  userId         : String,
  startDateTime  : Date,    
  endDateTime    : Date,       
  frequency      : String, 
  lastReminder   : Date,   
  nextReminder   : Date,    
  snoozeTime     : Date,   
  status         : String, 
  createdOn      : Date,
  modifiedOn     : Date
}
```