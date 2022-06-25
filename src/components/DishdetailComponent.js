import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDish({selDish}) {
        return (
            <Card className="col-12 col-md-5 m-1">
                <CardImg width="100%" src={selDish.image} alt={selDish.name}/>
                <CardBody>
                    <CardTitle><strong>{selDish.name}</strong></CardTitle>
                    <CardText>{selDish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    function RenderComments({comments}) {
        let commentElem;
        if(comments) {
            commentElem = comments.map((comment) => { 
                return ( <li key={comment.id}> <p>{comment.comment}</p> <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p> </li> ) 
            })
        } else {
            commentElem = <div></div>;
        }
        return commentElem;
    }

    const DishDetail = (props) => {
        console.log("DishDetail Component render invoked");
        const selDish = props.dish;
        if(selDish){
            return (
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem> <Link to='/menu'>Menu</Link> </BreadcrumbItem>
                            <BreadcrumbItem active> {selDish.name} </BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{selDish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish selDish={selDish} />
                        <div className="col-12 col-md-6 m-1">
                            <h4>Comments</h4>
                            <ul className = "list-unstyled">
                                <RenderComments comments={props.comments} />
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
            
    }


export default DishDetail;