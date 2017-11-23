# todo
A CLI Todo manager

## Aims

+ Provide a similar CLI API to [task warrior](https://taskwarrior.org), but not weighed down by full compatability
+ Use a simple, append only, many-file storage solution; with no build-in syncing (for now)
+ Be configured through an expressive yaml dotfile
+ Provide a CLI first, then a react native app, then a react web app

## Notes

### Fields that a task should have:

+ [ ] status 
+ [ ] due
+ [ ] wait
+ [ ] depends/depended on
+ [ ] project
+ [ ] priority
+ [ ] tags
+ [ ] created
+ [ ] modified
+ [ ] recur
+ [ ] custom
