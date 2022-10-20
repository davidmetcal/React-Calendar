<a name="readme-top"></a>

<br />
<div align="center">

<h3 align="center">React Challenge</h3>

  <p align="center">
    A demo app to show how we can build a calendar with functionality to add reminders to specific date and times.
   
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#features">Features</a></li>
<li><a hfref="#contact">Contact</a></li>

  </ol>
</details>

## About The Project

I followed the guidance of the brief to produce a React app that renders a calendar displaying months of the every year. Each month displays the days of that month, with the ability to select the day and enter a reminder.

I used the redux datastore and implemented redux-persist to handle data between renders and supplying the data throughout the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][react.js]][react-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

API keys has been provided in src/api/index.js. The api is limit to 50 calls which in dev in fine, but in production an account would be required.

### Prerequisites

There isma requirement for npm to be installed. If not already this can be done with the npm command below to install globally.

- npm
  ```sh
  npm install npm@latest -g
  ```

### How to deploy

- Run `npm install` | `yarn install` to install all dependencies.
- Run `npm start` | `yarn run` to run the app locally.
- You can find the project running on `localhost:3000`.

## Usage

### Selecting the desired year and month

The calendar app is used by either selecting the prev or next buttons to scoll through months of the year. Alternatively you can use the dropdowns provided to selected the desired date.

### Adding a reminder

Select the desired day of month by clicking on the date which will open the reminder modal.

- close the modal with the cross icon.
- change the date by clicking on the date and selecting new date.
- select the desired time of the reminder
- type text in the reminder section, this is limited to 30 characters (indicator below to show how many characters used)
- start typing the city and select the correct locaiton from dropdown.
- save the reminder by clicking "Add to calendar button"

### Editing a reminder

All reminders will be displayed in in the calendar in the correct days. To edit a reminder:

- click on the desired reminder to edit
- edit any information with the same process as adding a reminder above
- to save click "Update"

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

### Redux store with persist

Although this is a relatively simple application, I used Redux store to show I am comfortable using the data store for dispatching and pulling data. I also implemented a redux-persist, mainly because it make it easier to develop with, but its also something useful to retain data between states if we are not using a backend database.

The datastore is mainly responsible for holding the reminders, we are adding an id to each reminder as well as the relavent data. This makes it easy to access when fetching the reminders from the store.

Current set-up only includes one reducer under reminderSlice.js but we could add additional reminders as the project expanded and combine them using the combineReducer() from redux toolkit.

### AccuWeather API integration

I implemented a select input so when entering the city we could have auto-suggestions for different cities with their country code next to it. This means we can easily access the AccuWeather key for that city and use it to make an API call for the weather on that day.

Currently the api is just giving the weather for the current day in the city. Their developer website wasn't accssible when I came to integrate a forecast for a specific day so I was unable to complete this.

The weather forecast is shown in the reminder modal once the city has been selected. It would be easy to store this and show it on the calendar, however as the weather forecast is forever changing it would require calling the api on every render of the calendar. This is something that I would of liked to of expanded further on if the app was going further.

### Unit Testing

As requested in the bonus section I implemented some simple testing to show that on adding of a reminder, the calendar would render the information on the calendar. Again this is simple testing but could be extended with further development.

## Contact

David Metcalfe - davidmetcal@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
