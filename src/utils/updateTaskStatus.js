import httpClient from "./httpClient"



export const updateTaskStatus = async (taskName, taskStatus) => {
    try {
        const response = await httpClient.put(`/update-task/${taskName}/${taskStatus}`)
        return response
    } catch (error) {
        console.error("Błąd podczas aktualizacji zadania: " + error)
    }
}