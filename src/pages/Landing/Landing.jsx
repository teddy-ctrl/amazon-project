import React from "react";
import Carousel from '../../pages/MenuBanner/MenuBanner'
import LayOut from "../../Components/LayOut/LayOut";
import HorizontalScroller from '../../Components/HorizontalScroller/HorizontalScroller';
import DealItem from '../../Components/HorizontalScroller/DealItem';

import todayDealsData from '../../Components/HorizontalScroller/TodayDeals.json';
import movieData from '../../Components/HorizontalScroller/todymovie.json';

const Landing = () => {
    const renderMovieItem = (item, index) => (
        <div key={index} style={{
            flex: '0 0 160px', 
            width: '160px',
            height: '260px', 
            marginRight: '15px',
            boxSizing: 'border-box'
        }}>
            <img 
                src={item.imgs} 
                alt={item.itemTitle} 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    borderRadius: '4px' 
                }} 
            />
        </div>
    );
  return (
    <LayOut>
      <Carousel />
      {/* <Category />  */}
      {/* <Product /> */}
       <HorizontalScroller
                title="Today's Deals"
                items={todayDealsData}
                renderItem={(item, index) => <DealItem key={index} item={item} />}
            />
            
            <HorizontalScroller
                title="Most wished for in Movies & TV"
                items={movieData.movie}
                renderItem={renderMovieItem}
            />
    </LayOut>
  );
};

export default Landing;
