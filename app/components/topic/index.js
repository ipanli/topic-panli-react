import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import style from './styles.styl';
import LazyLoad from 'react-lazy-load';
import Pagination from '../pagination/';


// 引入Fetch
import 'whatwg-fetch';

const ap = 'https://api.github.com/users/octocat/gists';
const ap2 = '/ShoppingGuideAPI/GetTopicItems?pageSize=50&id=391&curPage=1&_=1463998084439';

class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index:1,
            size:50,
            pages:5,
            total:250,
            jumper:true,
            banner:'',
            title:'',
            data: []
        }        
    }
    
    
 // 组件渲染后获取外界数据
    componentDidMount() {
        fetch(ap2)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    
                    banner:data.img,
                    title:data.title,
                    data: data.Content
                });
                
                document.title = data.title + '- Panli代购';
 
            })
            .catch((ex) => {
                console.log(ex);
            });
    }
    
  onChange (index) {
    this.setState({ index });
    alert(index);
  }
 
  render() {
    return (
      <div styleName="Topic">
        {this.state.banner.length > 0 ? <div styleName="TopicBanner" > 
            <img src={this.state.banner} />
         </div> : <div styleName="loadsta"> </div>}
        
        {this.state.data.length > 0 ? '' : <div >加载中...</div>}
        <div styleName="TopicMain">
        {this.state.data.map((item, index) =>
          <div styleName="prolistBox" key={index}>
                <div styleName="thumbBox">
                <LazyLoad height={225} offsetVertical={225}>
                    <img src={item.img} />
                 </LazyLoad>
                    
                </div>
                <h6 styleName="name">
                    {item.Name}
                </h6>
                <p styleName="price">
                    ￥{item.pric}
                </p>
           </div>
        )}
        </div>
        
        <Pagination
            index={this.state.index}
            size={this.state.size}
            total={this.state.total}
            jumper={this.state.jumper}
            onChange={this.onChange.bind(this)} />

      </div>
    );
  }
}
export default cssModules(Topic, style);