export interface Decision {
  id: string
  title: string
  description?: string
  confidence: number
  status: string
  outcome?: string
  result_value?: number
  created_at: string
}

export interface Analytics {
  total_decisions: number
  completed_decisions: number
  successful_outcomes: number
  accuracy: number
  average_confidence: number
}