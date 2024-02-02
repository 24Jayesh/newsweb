import React,{useEffect,useState} from 'react'
import Navbars from '../Components/Navbars'
import CardNews from '../Components/CardNews'
import {useParams} from 'react-router-dom'
const UserPage = (props) => {
 
  const [newsdata, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch("http://localhost:5001/news/details", {
          method:"GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        // console.log(data);
      setNewsData(data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount

  let categoryname =props.categoryname 
  // console.log(categoryname)
categoryname = categoryname.toLocaleLowerCase()
  //console.log(categoryname)
  // console.log(newsdata);

return (
  <>
    <Navbars />

    {((newsdata.length) !== 0 && (categoryname !== "all")) ? (
      <div className="grid-wrapper">
        {
          newsdata.filter((data) => data.category.toLocaleLowerCase() === categoryname)
            .map((item) => (
              <div key={item._id}>
                <div>
                  <CardNews
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    url_news={item.url_news}
                    authorname={item.authorname}
                    countryname={item.countryname}
                    category={item.category}
                    profile={item.profile}
                  />
                </div>
              </div>
            ))
        }
      </div>
    ) : (
      <div>
        {/* Content for categoryname !== "all" false condition */}
      </div>
    )}

    <div className="grid-wrapper">
      {((newsdata.length !== 0) && (categoryname === "all")) ? (
        newsdata.map((item) => (
          <div key={item._id}>
            <div>
              <CardNews
                key={item._id}
                title={item.title}
                description={item.description}
                url_news={item.url_news}
                authorname={item.authorname}
                countryname={item.countryname}
                id={item._id}
                category={item.category}
                profile={item.profile}
              />
            </div>
          </div>
        ))
      ) : (
        <div>
          {/* Content for categoryname === "all" false condition */}
        </div>
      )}
    </div>
  </>
);

};

export default UserPage;