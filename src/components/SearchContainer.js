import React from "react";
import '../styles/FoodSearch.css'
// 검색창 컴포넌트
function SearchContainer({keywordSearch, placeholder}) {
    return (
        <div className="foodSearch-container">
            <div className="foodSearch-body">
                <input type="text" className="keyword" placeholder= {`${placeholder}`}></input>
                <button className="searchBtn" onClick={keywordSearch}>검색</button>
            </div>
        </div>
    )
}
export default SearchContainer