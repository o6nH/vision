# GOOGLE (DEPLOYED NODE.JS/EXPRESS BACKEND SERVER)
# Google Cloud Platform Project
Select or create a project in the GUI for [<abbr title="Google Cloud Platform">GCP</abbr>](https://console.cloud.google.com/home) projects.

"Projects" are the first level of the resources hierarchy; like a root folder, projects contain other lower-level resources like storage, compute engines, and other services visible on the left navbar.

## Home Dashboard in GCP
Home dashboard provides a project overview.

## Billing
In order to use the GCP projects, [enable billing](https://cloud.google.com/billing/docs/how-to/modify-project) with valid information.

## Download and Install the Google Cloud SDK locally
The [Google Cloud <abbr title="software development kit">SDK</abbr>](https://cloud.google.com/sdk/docs/) (or devkit) makes the core functionality of Google's Cloud Services available through the [`gcloud` <abbr title="Command Line Interface">CLI</abbr>](https://cloud.google.com/sdk/gcloud/). 

Google Cloud Storage, for instance, can be managed online by starting with the *Storage* tab in the <abbr title="Google Cloud Platform">GCP</abbr> and completing forms. It can also be managed locally managed with the SDK; namely, the CLI utility function: [gsutil](https://cloud.google.com/storage/docs/gsutil). 


### [Ubuntu Distro](https://cloud.google.com/sdk/docs/quickstart-debian-ubuntu) Installation with WSL
With the <abbr title="Windows Subsystem for Linux">WSL</abbr> terminal, add the Cloud SDK distribution <abbr title="Universal Resource Identifier">URI</abbr> as a remote source for packages.

```bash
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

Import the public key for Google's Cloud Platform and add to keyrings.

```bash
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
```

Update the list of packages available through apt-get and install `google-cloud-sdk`.
```bash
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

## Configure the Cloud SDK
Initilize the SDK.
```bash
gcloud init
```

Configure the SDK to link your Google account by navigating to the given link in the terminal.

Select a project to link.

> Local machines can also be configured with the `gcloud config` command.

Verify account is listed use:
```bash
# List Auth users
gcloud auth list
```

# Server Setup
## Initialize a Google Cloud App Engine with Node.js 
The [Google Cloud App Engine](https://cloud.google.com/appengine/docs/nodejs/) is similar to [Heroku](https://www.heroku.com/) in that they each serve as a <abbr title="Platform-as-a-Service">PaaS</abbr> for [Node.js](https://nodejs.org/en/docs/guides/).

In order to [setup Node.js](https://cloud.google.com/nodejs/docs/setup) on the <abbr title='Google App Engine'>GAE</abbr>, we first have to create an App Engine application in our Google project.

```bash
# gcloud app create --project=[YOUR_PROJECT_ID]
gcloud app create --project=vision-to-graph
```

### Node.js and Google Cloud Storage Alternatives
There are several [alternatives](https://cloud.google.com/community/tutorials/running-nodejs-on-google-cloud) to GAE for running Node.js.

#### Ex: Google Cloud Storage
After installing the Google Cloud SDK locally, the CLI command that allowed this app to *make buckets*, for instance, is: 

```bash
#gsutil mb gs://REQUESTED_GLOBALLY_UNIQUE_BUCKET_NAME
gsutil mb gs://vision-img
```

## Configure App Engine Credentials to Authenticate Client
Using a *service* account for GCP project, rather than a user account, authorize a client emminating from whatever machince is running the code. Unless running on **Google App Engine**, which allows their ommition with the use of [Application Default Credentials](https://cloud.google.com/docs/authentication/production?hl=en_US).

>If a `new`ly-constructed *object* from a newly-`import`ed *constructor* from the `@google-cloud/`[*CLIENT_LIBRARY*](https://cloud.google.com/nodejs/docs/reference/libraries), is called without [credentials](https://cloud.google.com/docs/authentication/getting-started#auth-cloud-implicit-nodejs), then the constuctor function will look for credentials in the environment automatically (i.e., *Application Default Credentials*)

## Configure App Engine Permissions to Authorize Client's Intentions


# Google APIs
## Enable APIs for Project in GCP
In the <abbr title="Google Cloud Platform">GCP</abbr>,  [enable](https://console.cloud.google.com/flows/enableapi?apiid=cloudfunctions,pubsub,storage_api,translate,vision.googleapis.com&redirect=https://cloud.google.com/functions/docs/tutorials/ocr) the following APIs for this project:

- Cloud Vision API

## Install Cloud Client Libraries for Node
Install [Node.js packages](https://cloud.google.com/nodejs/docs/reference/libraries) that correspond to the enabled Google APIs with `npm`.

```bash
npm i -D @google-cloud/vision
```

# Deploying an Express App to Route HTTP Requests to Listeners that Respond.
The following command deploys any Node.js web application to the App Engine standard environment. After deployment App Engine attempts to start the app with npm start.
```bash
gcloud app deploy
```
# Create APK from Gradle files to also deploy Android App
# Make download link