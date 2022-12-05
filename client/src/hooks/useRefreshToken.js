import axios from "../api/axios"

const useRefreshToken = () => {
    const refresh = async () => {
          const response = await axios.post("/accessToken",
          JSON.stringify({ 'aa': "bbb" }),
          {
              headers: { 'Content-Type': 'application/json' },
              "Access-Control-Allow-Origin": "*"
          }
      );
        console.log(response.data.accessToken)
        localStorage.setItem('session', response.data.accessToken)
    }
  return (
    refresh
  )
}

export default useRefreshToken