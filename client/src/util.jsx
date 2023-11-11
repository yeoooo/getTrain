export const checkAccess = async (navigate) => {
  try{
    const response = await fetch('http://127.0.0.1:8080/api/v1/check?email='+sessionStorage.getItem("email"), {
      method: 'GET'
    })
      .then((res) => res.json());

    if (response.status !== "OK") {
      alert(response.data);
      navigate('/')
    }
  } catch(error){
    console.log(error.message);
  }
};