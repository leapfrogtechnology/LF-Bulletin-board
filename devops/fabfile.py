from fabric.api import run , env , put , cd , hide
from fabric.contrib import files
import os
import yaml
from jinja2 import Environment, FileSystemLoader

env.hosts = ['mulberrydaisy.lftechnology.com:2073']
env.user = 'lf-bot'
# env.key_filename = '~/.ssh/lf-bot.pem'

def makeWorkdir():
    run("mkdir -p "+"~/"+os.getenv('CI_PROJECT_NAME','default_project')+'/'+os.getenv('CI_JOB_NAME','default'))
    
def compileConfig():
    #Load data from YAML into Python dictionary
    # config_data = yaml.load(open('./data.yml'))
    KV = {}
    for param in os.environ.keys():
        KV.update({param:os.environ[param]})
    
    env = Environment(loader = FileSystemLoader('./'), trim_blocks=True, lstrip_blocks=True)
    template = env.get_template('docker-compose.yaml.j2')

    config_file = open("docker-compose.yaml", "w")
    config_file.write(template.render(KV))


def stopServer():
    with cd("~/"+os.getenv('CI_PROJECT_NAME','default_project')+'/'+os.getenv('CI_JOB_NAME','default')):
        if files.exists("docker-compose.yaml"):
            run("docker-compose down")

def uploadConfig():    
        put('docker-compose.yaml',"~/"+os.getenv('CI_PROJECT_NAME','default_project')+'/'+os.getenv('CI_JOB_NAME','default'))

def updateImage():
    with hide('running'):
        run("docker login -u "+os.getenv('REGISTRY_USER')+" -p "+os.getenv('REGISTRY_PASSWORD')+" "+os.getenv('REGISTRY_URL'))
    run("docker pull "+os.getenv('REGISTRY_URL','https://hub.docker.io')+"/bulletin-app:"+os.getenv('APP_TAG','latest'))
    run("docker pull "+os.getenv('REGISTRY_URL','https://hub.docker.io')+"/bulletin-api:"+os.getenv('API_TAG','latest'))


def deploy():
    with cd("~/"+os.getenv('CI_PROJECT_NAME','default_project')+'/'+os.getenv('CI_JOB_NAME','default')):        
        run("docker-compose up -d")

    