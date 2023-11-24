import React, { useEffect } from "react";
import SearchForm from '../@components/search/searchForm'
import '../style/login.css'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { checkAccess } from "../util.jsx";

function SearchFormPage(props){
  const navigate = useNavigate();

  const apiURL = 'http://ec2-3-34-52-150.ap-northeast-2.compute.amazonaws.com'
  useEffect(() => {
    checkAccess(navigate);
  }, []);

  const logout = async() => {
    const res = window.confirm("로그아웃 하시겠습니까?");
    if(res === true){
      try{
        const resp = await fetch(apiURL + "/api/v1/logout?email=" + sessionStorage.getItem("email"),
        {
          method: "GET"
        })
          .then((res) => res.json());
        if (resp.status === "OK") {
          window.alert("로그아웃 되었습니다.")
        }else{
          window.alert("로그아웃에 실패하였습니다. 관리자에게 문의하세요.")
        }
        navigate('/')
      }
      catch (e){
        console.log(e.message)
      }

    }

  }


    return(
        <SearchFormPageMain>
          <br/>
            <p align={"right"} onClick={logout} style={{fontSize: "1.5rem", margin: "1vh 1vh 0 0", border: "1rem 1rem 1rem 1rem solid #fffff" }}><a>로그아웃</a></p>
            <SearchForm />
        </SearchFormPageMain>
    )
}

const SearchFormPageMain = styled.main`
  background-color: #ffffff;
  @media (prefers-color-scheme: dark){
    background-color: #121212;
  }
`

export default SearchFormPage