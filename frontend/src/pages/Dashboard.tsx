import { useEffect, useState } from "react"
import { getDecisions, getAnalytics } from "../api/decisionApi"
import type { Decision, Analytics } from "../types/desicion"
import DecisionForm from "../components/DecisionForm"
import DecisionList from "../components/DecisionList"
import "../styles.css"

function Dashboard() {

    const [decisions, setDecisions] = useState<Decision[]>([])
    const [analytics, setAnalytics] = useState<Analytics | null>(null)

    const loadData = async () => {
        const decisionsData = await getDecisions()
        const analyticsData = await getAnalytics()

        setDecisions(decisionsData)
        setAnalytics(analyticsData)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className="container">

            <h1>Decision Tracker</h1>

            {analytics && (
                <div className="card">
                    <h3>Analytics</h3>

                    <div className="analytics">
                        <div>
                            <p><strong>Total Decisions</strong></p>
                            <p>{analytics.total_decisions}</p>
                        </div>

                        <div>
                            <p><strong>Accuracy</strong></p>
                            <p>{analytics.accuracy}%</p>
                        </div>

                        <div>
                            <p><strong>Average Confidence</strong></p>
                            <p>{analytics.average_confidence}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="card">
                <DecisionForm refresh={loadData} />
            </div>

            <div className="card">
                <DecisionList decisions={decisions} />
            </div>

        </div>
    )
}

export default Dashboard