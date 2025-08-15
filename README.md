# Drive Tutorial

## TODO

- [x] Set up fatabase and data model
- [x] Move folder open state to URL
- [x] Add auth
- [x] Add file uploading
- [x] Add analytics
- [x] Keep file and folder in order
- [x] Add homepage + onboarding
- [x] Add delete
- [ ] Create the dashboard layout
- [ ] Find a better solution for root folder
- [ ] Fix clerk integration (make sure to use app page when possible)


## Fun follow ups

### Folder deletions

Make sure you fetch all of the folders that have it as a parent, and their children too

### Folder creations

Make a server action that takes a name and parentId, and creates a folder with that name and parentId (don't forget to set the ownerId).

### Access control

Check if user is owner before showing the folder page.

### Make a "file view" page

You get the idea. Maybe check out my last tutorial?

### Toasts!

### Gray out a row while it's being deleted
