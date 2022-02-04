import axios from 'axios'
import { getToken } from './auth'
import { baseUrl } from '../config'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * Dog Requests

export function getAllDogs() {
  return axios.get(`${baseUrl}/dogs/`)
}

export function getSingleDog(dogId) {
  return axios.get(`${baseUrl}/dogs/${dogId}/`)
}

// * User Requests
export function registerUser(formData) {
  return axios.post(`${baseUrl}/register/`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/login/`, formData)
}

export function getSingleUser(userId) {
  return axios.get(`${baseUrl}/profile/${userId}/`, headers())
}

export function deleteUser(userId) {
  return axios.delete(`${baseUrl}/profile/${userId}/`, headers())
}

// Shuffling data 
export function shuffle(array) {
  let currentIndex = array.length, randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}
// * Favorite Requests
export function favoriteDog(dogId, favoriteObject) {
  return axios.post(`${baseUrl}/dogs/${dogId}/favorites/`, favoriteObject, headers())
}

export function removeFavorite(dogId, favoriteId) {
  return axios.delete(`${baseUrl}/dogs/${dogId}/favorites/${favoriteId}/`, headers())
}

// * Question Requests

export function createQuestion(dogId, formData) {
  return axios.post(`${baseUrl}/dogs/${dogId}/questions/`, formData, headers())
}

export function deleteQuestion(dogId, questionId) {
  return axios.delete(`${baseUrl}/dogs/${dogId}/questions/${questionId}/`, headers())
}