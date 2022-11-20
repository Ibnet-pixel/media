import React from "react"
import "./Teacherhomepage.css"
// import { useHistory } from "react-router-dom"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const TeacherHomepage = (user) => {
    // const history = useHistory()
    var teachName = user.setLoginUser.name
    //var teachEmail = user.setLoginUser.email
    //var teachID = user.setLoginUser._id

    //console.log(teachName)
    //console.log(user.setLoginUser.email)

    const [ event, setEvent] = useState({
        teacherName: teachName,
        teacherEmail: user.setLoginUser.email,
        teacherID: user.setLoginUser._id,
        title: "",
        description:"",
        date:"",
        StartTime: "",
        EndTime: "",
        venue: "",
        status: "Not Checked"
    })

    const handleChange = e => {
        var { name, value } = e.target
        if(name === "StartTime" || name === "EndTime")
        {
            value = tConvert (value);
        }
        setEvent({
            ...event,
            [name]: value
        })
    }
    function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
    }

    const SubmitEvent = () => {

        const { title,teacherName,teacherEmail,teacherID,description,date,StartTime,EndTime,venue,status } = event

        if(title && teacherName && teacherEmail && teacherID && description && date && StartTime && EndTime && venue && status){
            axios.post("http://localhost:9002/SendEventRequest", event)
            .then( 
                res => alert(res.data.message),
                //history.push("./login")
            )
        }else {
            alert("invalid input")
        }
        //alert("Submited")
    }

    return (
        <>
            {console.log("Event",event)}    
            <Container>
                <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Welcome {teachName}</h1>
                <Row className="mt-2 text-center">
                    <h2>Generate Event Request</h2>
                    <Col lg={5} md={6} sm={6} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Event Title</Form.Label>
                                <Form.Control type="text" name="title" placeholder="Enter event title" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDescription">
                                <Form.Label>Event Description</Form.Label>
                                <Form.Control as="textarea" rows="3" name="description" placeholder="Event Description" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDate">
                                <Form.Label>Event Date</Form.Label>
                                <Form.Control type="date" name="date" placeholder="Event Date" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicTime">
                                <Form.Label>Event Start Time</Form.Label>
                                <Form.Control type="time" name="StartTime" placeholder="Event Start Time" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicTime">
                                <Form.Label>Event End Time</Form.Label>
                                <Form.Control type="time" name="EndTime" placeholder="Event End Time" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicVenue">
                                <Form.Label>Event Venue</Form.Label>
                                <Form.Control type="text" name="venue" placeholder="Event Venue" onChange={handleChange} />
                            </Form.Group>
                            <Row className="mt-2">
                            {/* Removed type="submit" from here */}
                                <Button variant="success btn-block" onClick={SubmitEvent}> 
                                    Submit Request
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <h6 className="mt-2 p-2 text-center text-secondary ">Copyright © 2022 Team Welp FAST CFD. All Rights Reserved.</h6>
            </Container>
        </>
    );
}

export default TeacherHomepage
