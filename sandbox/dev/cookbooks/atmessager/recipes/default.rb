remote_file '/tmp/nodejs.deb' do
    source "http://ppa.launchpad.net/chris-lea/node.js/ubuntu/pool/main/n/nodejs/nodejs_0.10.37-1chl1~trusty1_amd64.deb"
    checksum "507bd0f6c59e0652e609f72ca09abb984fdf3510d126aead78556be934577a47"
    notifies :run, "execute[run_install-nodejs]", :immediately
end

execute 'run_install-nodejs' do
    command "dpkg -i /tmp/nodejs.deb || apt-get -f install -y"
    user "root"
    action :nothing
end

bash 'Start ATMessager' do
  user 'vagrant'
  code <<-EOC
    cd /opt/nx/atmessager
    node app.js
  EOC
end
