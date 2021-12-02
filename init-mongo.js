db.createUser({
  user: 'user',
  pwd: 'user',
  roles: [
    {
      role: 'readWrite',
      db: 'checklist_manager',
    },
  ],
});

db = new Mongo().getDb('checklist_manager');

db.createCollection('checklist');
db.createCollection('declaration-sync')
