const valid = ({ firstName, lastName, email, password, gender }) => {
    const err = {};

    if(!firstName){
        err.fullname = "Please add full name.";
    }else if(firstName.length <= 1){
        err.fullname = "First Name must be longer than 1 characters.";
    }

    if (!lastName) {
      err.username = "Please add User name.";
    } else if (lastName.length <= 1) {
      err.username = "Last Name must be longer than 1 characters.";
    }

    if (!email) {
      err.email = "Please add Email.";
    }

    if (!password) {
      err.password = "Please add Password.";
    } else if (password.length < 6) {
      err.password = "Password must be al least 6 characters long.";
    }

    if (!gender) {
      err.gender = "Please select a gender.";
    } else if (!["male", "female", "other"].includes(gender.toLowerCase())) {
      err.gender = "Invalid gender. Must be either 'male', 'female', or 'other'.";
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length  
    }
};

export default valid;