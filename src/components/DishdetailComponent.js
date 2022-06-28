import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Label, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

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

                            <CommentForm dishId={props.dish.id} addComment={props.addComment}/>
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

    class CommentForm extends Component {
        constructor(props) {
            super(props);
    
            this.state = {
                isModalOpen: false
            }
    
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
    
        handleSubmit(values) {
            // alert("current state: " + JSON.stringify(values));
            this.props.addComment(this.props.dishId, values.rating, values.name, values.comment)
        }
    
        render() {
            return(
                <>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
    
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className='form-group'>
                                    <Label htmlFor='rating' md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model='.rating' name='rating' className='form-control'>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>   
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='name' md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model='.name' id='name' name='name' 
                                            className='form-control'
                                            placeholder='Your Name'
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }} 
                                        />
                                        <Errors 
                                            className='text-danger'
                                            model='.name'
                                            show='touched'
                                            messages={{
                                                required: "Required. ",
                                                minLength: "Must be greater then 2 characters. ",
                                                maxLength: "Must be 15 characters or less. "
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='comment' md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model='.comment' name='comment' rows='6' className='form-control' />
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Col md={{size: 12}}>
                                        <Button type='submit' color='primary'>Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
            );
        }
    }
    


export default DishDetail;