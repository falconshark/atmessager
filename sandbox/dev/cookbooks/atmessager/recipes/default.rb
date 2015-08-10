bash 'Add chris-lea apt-repository' do
  user 'root'
  code <<-EOC
    sudo add-apt-repository -y ppa:chris-lea/node.js
    sudo apt-get update
  EOC
end

package 'nodejs'

bash 'Start ATMessager' do
  user 'vagrant'
  code <<-EOC
    cd /opt/nx/atmessager
    node app.js
  EOC
end
