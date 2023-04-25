import React, { useState } from "react";
import EventForm from "./EventForm";

function Create () {
    return (
        <div>
            {/* create button in navBar, button routes here */}
            {/* if user logged-in, show <EventForm/> */}
            {/* if user NOT logged-in show <SignUp> */}
            {/* <Create>  will route  to <SignUp> */}
            <EventForm />

        </div>
    )
}

export default Create; 