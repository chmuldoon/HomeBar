import React, { useEffect, Fragment, useState } from "react";
import { fetchSearchItems } from "../../actions/search_actions";
import { connect } from "react-redux";
const Navbar = ({fetchSearchItems}) => {
  const [searchType, setSearchType] = useState("ingredients");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayed, setDisplayed] = useState([]);
  useEffect(() => {
    fetchSearchItems()
  }, [fetchSearchItems])

  return (
    <div className="topBar">
      <div className="barLeft">
        <div>
          <input
            className="searchInput"
            type="text"
            placeholder={`Search for ${searchType}`}
            value={searchTerm}
            // onChange={handleChange("searchTerm")}
          />
          <div className="searchType">
            {searchType === "drinks" ? (
              <div
                className="searchTypeLeft"
                style={{
                  backgroundColor: "#4CA64C",
                }}
              >
                Drinks
              </div>
            ) : (
              <div
                className="searchTypeLeft"
                onClick={() => {
                  setSearchType("drinks");
                  setSearchTerm("");
                  setDisplayed([]);
                }}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "1px #4CA64C",
                }}
              >
                Drinks
              </div>
            )}
            {searchType === "ingredients" ? (
              <div
                className="searchTypeRight"
                style={{
                  backgroundColor: "#4CA64C",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                Ingredients
              </div>
            ) : (
              <div
                className="searchTypeRight"
                onClick={() => {
                  setSearchType("ingredients");
                  setSearchTerm("");
                  setDisplayed([]);
                }}
                style={{
                  backgroundColor: "white",
                  color: "black",

                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                Ingredients
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps, { fetchSearchItems})(Navbar)
