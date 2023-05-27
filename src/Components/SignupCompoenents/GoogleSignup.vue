<template>
    <a href="#" class="signup-google">
        <font-awesome-icon :icon="['fab', 'google']" class="signup-google-icon"/>
        <span class="signup-google-text">Sign Up/In with Google</span>
    </a>
</template>

<style scoped>
.signup-google {
    display: flex;
    align-items: center;
    border-radius: 16px;
    background-color: #4C6EF4;
    text-decoration: none;
    padding: 8px;
    margin: 0 60px;
    margin-bottom: 45px;
    box-shadow: 0 10px 20px -5px rgba(76, 110, 244, 0.9);
}

.signup-google-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    color: #ff7870;
    border-radius: 10px;
    background-color: white;
    font-size: 25px;
}

.signup-google-text {
    color: white;
    font-weight: 500;
    display: block;
    margin: 0 auto;
}

.signup-or {
    color: #363A40;
    display: block;
    text-align: center;
    position: relative;
    margin-bottom: 55px;
}

.signup-or-text {
    display: inline-block;
    padding: 5px 20px;
    background-color: white;
    position: relative;
    font-size: 14px;
}

.signup-or:before {
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    background-color: #999;
    transform: translateY(-50%);
}

.signup-already {
    text-align: center;
    color: #363A40;
    font-size: 13px;
}

.signup-already-link {
    color: #4C6EF4;
    text-decoration: none;
}

.form-group {
    margin-bottom: 25px;
}

.form-label {
    display: inline-block;
    cursor: pointer;
    color: #363A40;
    margin-bottom: 15px;
    font-size: 13px;
}

.form-input {
    display: block;
    width: 100%;
    padding: 20px;
    border-radius: 15px;
    border: 0;
    outline: none;
    font-family: "Poppins", sans-serif;
    background-color: #F2F3F5;
    color: #363A40;
    font-size: 16px;
}

.form-input::-webkit-input-placeholder {
    color: #B4BDC1;
}

.form-submit {
    display: block;
    margin-top: 45px;
    width: 100%;
    padding: 20px;
    color: white;
    text-align: center;
    cursor: pointer;
    border: 0;
    border-radius: 15px;
    background-color: #81C91D;
    font-size: 16px;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    margin-bottom: 20px;
    box-shadow: 0 10px 20px -5px rgba(129, 201, 29, 0.9);
    outline: none;
}

@media screen and (max-width: 767px) {
    .signup {
        padding: 30px 20px;
    }
}</style>