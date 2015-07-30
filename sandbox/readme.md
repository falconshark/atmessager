Sandbox
---

This is a virtual environment for developer to testing the new code of website.

Installation
---
1.Downloads vagrant (1.7.2) from http://www.vagrantup.com/downloads.html 

2.Install vagrant.

3.Download required vagrant box from **software -> vagrant-box** in google drive.

4.Import vargrant box with this command:
```bash
$ vagrant box add [BOX NAME] [BOX FILE]
```

Workaround for Vagrant bug on chef-solo
---
1.Open the source code file of chef solo which used by vagrant:
```bash
$ cd /opt/vagrant/embedded/gems/gems/vagrant-x.x.x(Your vagrant version number)/plugins/provisioners/chef/provisioner
$ sudo vi chef_solo.rb
```

2.Edit the line 37 of chef_solo.rb, change cached true to **false**:
```ruby
existing = synced_folders(@machine, cached: false)
```


Usage
---
At sandbox/dev, run this commend to start the virtual machine and connect it:
```bash
$ vagrant up
$ vargrant ssh
```
**The first setup may need to reboot 1-2 times.**

If you want to stop it , run this command:
```bash
$ vagrant halt
``` 

Option
---
Server IP:
The default ip of the machine is 192.168.8.58, you can use it to connect to web server.