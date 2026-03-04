import axios from "axios"
import type { Decision, Analytics } from "../types/desicion"

const API = axios.create({
  baseURL: "http://127.0.0.1:5000"
})

export const getDecisions = async (): Promise<Decision[]> => {
  const res = await API.get("/decisions")
  return res.data
}

export const createDecision = async (data: {
  title: string
  description?: string
  confidence: number
}) => {
  return API.post("/decisions", data)
}

export const getAnalytics = async (): Promise<Analytics> => {
  const res = await API.get("/analytics")
  return res.data
}