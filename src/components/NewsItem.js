import React, { Component } from 'react';

export class NewsItem extends Component {
    // constructor(props){
    //     super(props);

    // }
    render() {


        let { title, description, urlToImage, newsUrl, author, date, source } = this.props;

        return <div className='container'>

            <div className="card my-3">
                    <span className="position-absolute top-10  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:'90%'}}>{source}</span>
                <img src={urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? 'unknown' : author} on {date}</small></p>
                    <a href={newsUrl} className="btn btn-sm btn-dark btn-primary">Read more</a>
                </div>
            </div>
        </div>;
    }
}

export default NewsItem;
