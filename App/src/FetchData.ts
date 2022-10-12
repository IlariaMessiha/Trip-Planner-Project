import Axios from 'axios'
import { useState } from 'react'
import { Location } from "./models/Location";
export class FetchData {
    public getLocation() {
        Axios.get('http://localhost:3333/locations').then((response) => {
            console.log(response)
        })
    }
    public getActivities() {
        Axios.get('http://localhost:3333/activities').then((response) => {
            console.log(response)
        })
    }
    public getReviews() {
        Axios.get('http://localhost:3333/reviews').then((response) => {
            console.log(response)
        })
    }
    public getUsers() {
        Axios.get('http://localhost:3333/users').then((response) => {
            console.log(response)
        })
    }
}
export const fetchData = new FetchData()