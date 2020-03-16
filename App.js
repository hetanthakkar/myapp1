import React from "react";
import { BackHandler, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
  Dimensions,
  ActivityIndicator,
  Clipboard,
  Share,
  StatusBar,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  navigation
} from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { YellowBox, TouchableWithoutFeedback, Keyboard } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { Picker } from "react-native-picker-dropdown";
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAfGN94rWhA55dceve-ab5R5nEL6o4xXeg",
  authDomain: "new1-930be.firebaseapp.com",
  databaseURL: "https://new1-930be.firebaseio.com",
  projectId: "new1-930be",
  storageBucket: "new1-930be.appspot.com",
  messagingSenderId: "332990256430",
  appId: "1:332990256430:web:640a6413492c34bf2a96bf",
  measurementId: "G-SBPS6449GM"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var fetch_photo;
import _ from "lodash";
YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
var fetch_name = "initial";
var id;
var radio_props = [
  { label: "Male    ", value: "Male" },
  { label: "Female", value: "Female" }
];
var cid = 1;
const screenWidth = Math.round(Dimensions.get("window").width) / 100;
const screenHeight = Math.round(Dimensions.get("window").height) / 100;

class Signup extends React.Component {
  getCities = () => {
    if (this.state.state == "Gujarat")
      return [
        "Enter City",
        "Ahmedabad",
        "Anand",
        "Bhavnagar",
        "Gandhinagar",
        "Jamnagar",
        "Rajkot",
        "Surat",
        "Vadodara"
      ].map(citi => <Picker.Item label={citi} value={citi} />);
    if (this.state.state == "Maharashtra")
      return [
        "Enter City",
        "Akola",
        "Kalyan",
        "Mumbai",
        "Navi Mumbai",
        "Panvel",
        "Pune"
      ].map(citi => <Picker.Item label={citi} value={citi} />);
    if (this.state.state == "Chhattisgarh")
      return [
        "Enter City",
        "Raipur",
        "Bilaspur",
        "Bastar",
        "Jashpur",
        "Durg",
        "Koriya"
      ].map(citi => <Picker.Item label={citi} value={citi} />);
    if (this.state.state === "Jharkhand")
      return [
        "Enter City",
        "Ranchi",
        "Bokaro",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "Ghatshila",
        "Hazaribagh",
        "Jamshedpur"
      ].map(citi => <Picker.Item label={citi} value={citi} />);
    if (this.state.state == "Kerala")
      return ["Enter City", "Kochi"].map(citi => (
        <Picker.Item label={citi} value={citi} />
      ));
    if (this.state.state == "Madhya Pradesh")
      return [
        "Enter City",
        "Bhopal",
        "Indore",
        "Gwalior",
        "Jabalpur",
        "Sagar",
        "Ujjain "
      ].map(citi => <Picker.Item label={citi} value={citi} />);
    if (this.state.state == "Karnataka")
      return [
        "Enter City",
        "Mangalore",
        "Bangalore",
        "Mysore",
        "Bijapur"
      ].map(citi => <Picker.Item label={citi} value={citi} />);
    if (this.state.state == "Rajasthan")
      return [
        "Enter City",
        "Kota",
        "Udaipur",
        "Jaipur",
        "Jodhpur",
        "Sikar",
        "Ajmer"
      ].map(citi => <Picker.Item label={citi} value={citi} />);
    if (this.state.state == "Tamil Nadu")
      return [
        "Enter City",
        "Coimbatore",
        "Salem",
        "Madurai",
        "Tiruchirapalli"
      ].map(citi => <Picker.Item label={citi} value={citi} />);
    if (this.state.state == "Uttar Pradesh")
      return [
        "Enter City",
        "Kanpur",
        "Lucknow",
        "Ghaziabad",
        "Agra",
        "Varanasi",
        "Prayagraj"
      ].map(citi => <Picker.Item label={citi} value={citi} />);
    if (this.state.state == "Delhi")
      return ["Enter City", "Delhi NCR"].map(citi => (
        <Picker.Item label={citi} value={citi} />
      ));
    if (this.state.state == "")
      return <Picker.Item label="Enter City" value="" />;
  };
  submit = async () => {
    console.log("Error is " + this.state.Error);
    var count = 0;
    if (this.state.fname == "")
      this.setState({ Error: "Please enter your name" }, () => count++);

    if (this.state.email == "") {
      this.setState({ Error: "Please enter your Email" }, () => count++);
    }
    if (this.state.password == "") {
      this.setState({ Error: "Please enter your Password" }, () => count++);
    }
    if (
      this.state.cpassword == "" ||
      (this.state.password == "" && this.state.cpassword != "")
    ) {
      this.setState({ Error: "please fill the password" }), () => count++;
    }
    if (this.state.password !== this.state.cpassword) {
      this.setState({ Error: "Password does not match" }, () => count++);
    }
    if (this.state.password.length < 5) {
      this.setState({ Error: "Password  must be more than 5" }, () => count++);
    }
    if (this.state.gender == "") {
      this.setState({ Error: "Please enter your gender" }, () => count++);
    }
    if (this.state.state == "") {
      this.setState({ Error: "Please enter your state" }, () => count++);
    }
    if (this.state.citi == "") {
      this.setState({ Error: "Please enter your city" }, () => count++);
    }
    if (
      this.state.citi !== "" &&
      this.state.state != "" &&
      this.state.fname != "" &&
      this.state.password != "" &&
      this.state.enail != "" &&
      this.state.cpassword != ""
    ) {
      var k = 0;
      console.log("entered conditional iff");
      this.setState({ Error: "Success" });
    }

    temp = async () => {
      if (this.state.Error == "Success") {
        for (let k = 65; k <= id - 1; k++) {
          console.log("id is " + id);
          console.log("entered for loop");
          await firebase
            .database()
            .ref("user/" + k)
            .on("value", snapshot => {
              fetch_name = snapshot.val().name;
              console.log(fetch_name);
              if (fetch_name == this.state.fname) {
                console.log("locho avyo");
                this.setState({ seen: 1 });
                this.setState({
                  Error: "firebase:Email id /username already exists"
                });
              }
            });
        }
        if (this.state.Error == "Success") {
          console.log("not fuckeed up");
          var em = this.state.email;
          var ps = this.state.password;
          firebase
            .auth()
            .createUserWithEmailAndPassword(em, ps)
            .then(() => console.log("success"))
            .catch(error => console.log(error));

          firebase
            .database()
            .ref("user/" + id)
            .set({
              number: this.state.number,
              name: this.state.fname,
              email: this.state.email,
              password: this.state.password,
              state: this.state.state,
              city: this.state.citi,
              gender: this.state.gender
            });
          this.setState({ flag: 0 });
          firebase
            .database()
            .ref("id")
            .set({
              number: id + 1
            });
          this.setState({ Error: "Form Submitted succesfully" });
          console.log("about to exit");
        }

        console.log("exited finally");
      }
      if (this.state.Error == "Form Submitted succesfully")
        this.props.navigation.navigate("Pic", {
          name: this.state.fname,
          gender: this.state.gender,
          id: id + 1,
          email: this.state.email
        });
    };

    setTimeout(temp, 1000);
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    var firebaseConfig = {
      apiKey: "AIzaSyAfGN94rWhA55dceve-ab5R5nEL6o4xXeg",
      authDomain: "new1-930be.firebaseapp.com",
      databaseURL: "https://new1-930be.firebaseio.com",
      projectId: "new1-930be",
      storageBucket: "new1-930be.appspot.com",
      messagingSenderId: "332990256430",
      appId: "1:332990256430:web:640a6413492c34bf2a96bf",
      measurementId: "G-SBPS6449GM"
    };
    this.setState({ fname: "", flag: 1 });

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase
      .database()
      .ref("id/number")
      .on("value", snapshot => {
        id = snapshot.val();
        console.log("fetch number is " + id);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      gender: "",
      seen: 0,
      email: "",
      cpassword: "",
      password: "",
      state: "",
      citi: "",
      flag: 0,
      Error: "",
      number: 0
    };
  }
  handleValueChange = state => {
    this.setState({ state });
    this.setState({ citi: "" });
    console.log(this.state.state);
  };
  handleCityChange = state => {
    this.setState({ citi });
    console.log(this.state.citi);
  };
  updateciti = value => {
    console.log("enters");
    this.setState({ citi: value });
  };
  handleBackButton = () => {
    this.props.navigation.navigate("Login");
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 33,
            fontWeight: "bold",
            width: screenWidth * 100,
            left: screenWidth * 27,
            top: screenHeight * -2
          }}
        >
          Get Started
        </Text>
        <Text style={{ color: "yellow", fontSize: 22, textAlign: "center" }}>
          {this.state.Error}
        </Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="white"
          style={styles1.myText}
          onChangeText={fname => this.setState({ fname })}
        />
        <TextInput
          placeholder="Email Id"
          placeholderTextColor="white"
          style={styles1.myText}
          onChangeText={email => this.setState({ email })}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          style={styles1.myText}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <TextInput
          placeholder="Re-enter Password"
          placeholderTextColor="white"
          style={styles1.myText}
          secureTextEntry={true}
          onChangeText={value => {
            this.setState({ cpassword: value });
          }}
        />
        <Text></Text>

        <RadioForm
          style={styles1.button}
          buttonSize={15}
          formHorizontal={true}
          labelHorizontal={true}
          radio_props={radio_props}
          labelStyle={{ fontSize: 20, color: "white" }}
          initial={-1}
          onPress={value => {
            this.setState({ gender: value });
          }}
        ></RadioForm>
        <Picker
          key={cid + 1}
          selectedValue={this.state.state}
          onValueChange={this.handleValueChange}
          mode="dialog"
          textStyle={styles1.pickerText}
        >
          <Picker.Item label="Enter State" value="" />
          <Picker.Item label="Delhi" value="Delhi" />
          <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
          <Picker.Item label="Goa" value="Goa" />
          <Picker.Item label="Gujarat" value="Gujarat" />
          <Picker.Item label="Haryana" value="Haryana" />
          <Picker.Item label="Jharkhand" value="Jharkhand" />
          <Picker.Item label="Karnataka" value="Karnataka" />
          <Picker.Item label="Kerala" value="Kerala" />
          <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
          <Picker.Item label="Maharashtra" value="Maharashtra" />
          <Picker.Item label="Punjab" value="Punjab" />
          <Picker.Item label="Rajasthan" value="Rajasthan" />
          <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
          <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
        </Picker>

        <Picker
          key={cid}
          onValueChange={itemValue => this.updateciti(itemValue)}
          selectedValue={this.state.citi}
          mode="dialog"
          textStyle={styles1.pickerText}
        >
          {this.getCities()}
        </Picker>

        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <TouchableOpacity
          onPress={() => this.submit()}
          style={{
            width: "40%",
            borderRadius: 9,
            backgroundColor: "#2A94E2",
            left: screenWidth / 49,
            top: screenHeight * -12,
            height: "6%"
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 30,
              textAlignVertical: "center"
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  pickerText: {
    width: screenWidth * 100,
    color: "white"
  },
  button: {
    left: screenWidth * -22
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003f5c"
  },
  myText: {
    color: "white",
    borderWidth: 1.2,
    borderColor: "#d6d0cf",
    margin: 10,
    padding: 10,
    width: "95%",
    borderRadius: 12
  }
});

class Login extends React.Component {
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAfGN94rWhA55dceve-ab5R5nEL6o4xXeg",
      authDomain: "new1-930be.firebaseapp.com",
      databaseURL: "https://new1-930be.firebaseio.com",
      projectId: "new1-930be",
      storageBucket: "new1-930be.appspot.com",
      messagingSenderId: "332990256430",
      appId: "1:332990256430:web:640a6413492c34bf2a96bf",
      measurementId: "G-SBPS6449GM"
    };
    this.setState({ fname: "", flag: 1 });

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  state = {
    email: "",
    password: ""
  };
  showError = () => {
    Alert.alert(
      "Login Error",
      "Incorrect username/password",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };
  navi = () => {
    var ids;
    for (let t = 1; t <= 99; t++) {
      firebase
        .database()
        .ref("user/" + t)
        .on("value", snapshot => {
          var fetch_email = snapshot.val().email;
          if (fetch_email == this.state.email) {
            ids = t;
            console.log("id is" + ids);
          }
        });
    }
    var em = this.state.email.match(/^([^@]*)@/)[1];
    console.log("id is " + ids);
    this.props.navigation.navigate("Main", { email: em, id: ids + 1 });
  };
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.navi())
      .catch(error => this.showError());
  };
  handleSignup = () => {
    this.props.navigation.navigate("Signup");
  };
  forget = () => {
    this.props.navigation.navigate("ForgetPassword");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
        <TextInput
          style={styles.inputBox}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
          placeholderTextColor="white"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
        />
        <Text>{"\n"}</Text>

        <TouchableOpacity onPress={this.forget}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text></Text>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <Text></Text>

        <TouchableOpacity onPress={this.handleSignup}>
          <Text style={styles.signupText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  forgot: {
    color: "white",
    fontSize: 14
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  signupText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
    color: "white"
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#F85C5E",
    borderColor: "#F6820D",
    borderRadius: 25,
    width: screenWidth * 80,
    height: screenHeight * 8
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  buttonSignup: {
    fontSize: 12
  }
});
// const AppStack = createStackNavigator({ Home: Login });
// const AuthStack = createStackNavigator({ SignIn: Signup });

class ForgetPassword extends React.Component {
  handleBackButtonForget = () => {
    this.props.navigation.navigate("Login");
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonForget
    );
    var firebaseConfig = {
      apiKey: "AIzaSyAfGN94rWhA55dceve-ab5R5nEL6o4xXeg",
      authDomain: "new1-930be.firebaseapp.com",
      databaseURL: "https://new1-930be.firebaseio.com",
      projectId: "new1-930be",
      storageBucket: "new1-930be.appspot.com",
      messagingSenderId: "332990256430",
      appId: "1:332990256430:web:640a6413492c34bf2a96bf",
      measurementId: "G-SBPS6449GM"
    };
    this.setState({ fname: "", flag: 1 });

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  state = {
    email: "",
    error: ""
  };

  handleForget = async () => {
    var auth = firebase.auth();
    var emailAddress = this.state.email;
    var flag = "";
    await auth
      .sendPasswordResetEmail(emailAddress)
      .then(function() {
        console.log("email sent");
        flag = 0;
        console.log(flag);
      })
      .catch(function(error) {
        console.log(error);
        flag = 1;
        console.log(flag);
      });
    if (flag == 1) this.setState({ error: "Email does not exist in database" });
    if (flag == 0) this.setState({ error: "Email Sent! Check your inbox" });
  };
  render() {
    return (
      <View style={styles3.container}>
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
        <Text style={styles3.forgetText}>{this.state.error}</Text>
        <TextInput
          style={styles3.inputBox}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
          placeholderTextColor="white"
          autoCapitalize="none"
        />
        <Text>{"\n"}</Text>

        <TouchableOpacity onPress={this.handleForget}>
          <Text style={styles3.signupText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  signupText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  forgetText: {
    color: "yellow",
    fontSize: 22,
    textAlign: "center"
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
    color: "white"
  }
});

class Main extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonForget
    );
  }
  handleBackButtonForget = () => {
    this.props.navigation.navigate("Login");
    return true;
  };
  renderImage = () => {
    id = this.props.navigation.getParam("id") - 1;
    console.log("fucking id is " + id);

    setTimeout(
      () =>
        firebase
          .database()
          .ref("user/" + 99)
          .on("value", snapshot => {
            fetch_photo = snapshot.val().photo;
          }),
      2000
    );

    setTimeout(() => this.setState({ fetch_photo }), 2000);
  };
  state = {
    fetch_photo:
      "https://iwgdfguidance.org/wp-content/uploads/2017/12/default_user_female.png"
  };

  render() {
    return (
      <View style={styles4.container}>
        <Text>{"\n"}</Text>
        <TextInput
          style={styles4.inputBox}
          onChangeText={console.log("hi")}
          placeholder="Search by name or skills"
          placeholderTextColor="white"
          autoCapitalize="none"
        />
        {this.renderImage()}

        <Image
          style={{
            height: screenHeight * 15,
            borderRadius: 100,
            width: screenWidth * 25,
            position: "absolute",
            left: screenWidth * 37,
            top: screenHeight * 18
          }}
          source={{
            uri: this.state.fetch_photo
          }}
        />
        <Text
          style={{
            position: "absolute",
            color: "white",
            left: screenWidth * 42,
            top: screenHeight * 35,
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {"\n"} {this.props.navigation.getParam("email")}
        </Text>
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            top: screenHeight * 9
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("hi")}
            style={{
              width: screenWidth * 35,
              borderRadius: 35,
              backgroundColor: "#035BA2",
              height: screenHeight * 20,
              left: screenWidth * -4
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 22
              }}
            >
              {"\n"}
              {"\n"}Requests
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("hi")}
            style={{
              width: screenWidth * 35,
              borderRadius: 35,
              backgroundColor: "#035BA2",
              height: screenHeight * 20,
              left: screenWidth * 6
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 22
              }}
            >
              {"\n"}
              {"\n"}Message
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: "row",
            alignItems: "center",
            top: screenHeight * 3
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("hi")}
            style={{
              width: screenWidth * 35,
              borderRadius: 35,
              backgroundColor: "#035BA2",
              height: screenHeight * 20,
              top: screenHeight * -4,
              left: screenWidth * 8,
              marginTop: screenHeight * 5
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 20
              }}
            >
              {"\n"}
              {"\n"} Transaction
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("hi")}
            style={{
              width: screenWidth * 35,
              borderRadius: 35,
              backgroundColor: "#035BA2",
              height: screenHeight * 20,
              top: screenHeight * -4,
              left: screenWidth * 18,
              marginTop: screenHeight * 5
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 20
              }}
            >
              {"\n"}
              {"\n"} Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles4 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1E96C8",
    padding: 8
  },
  inputBox: {
    width: "85%",
    left: screenWidth * 6,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
    color: "white"
  }
});

class Pic extends React.Component {
  componentDidMount() {
    console.log("hi");
    var firebaseConfig = {
      apiKey: "AIzaSyAfGN94rWhA55dceve-ab5R5nEL6o4xXeg",
      authDomain: "new1-930be.firebaseapp.com",
      databaseURL: "https://new1-930be.firebaseio.com",
      projectId: "new1-930be",
      storageBucket: "new1-930be.appspot.com",
      messagingSenderId: "332990256430",
      appId: "1:332990256430:web:640a6413492c34bf2a96bf",
      measurementId: "G-SBPS6449GM"
    };
    console.log(this.props.gender);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  handleimage = async () => {
    var em = this.props.navigation.getParam("email");
    var email = em.match(/^([^@]*)@/)[1];

    if (this.props.navigation.getParam("gender") == "Female")
      var photo =
        "https://iwgdfguidance.org/wp-content/uploads/2017/12/default_user_female.png";
    else
      var photo =
        "https://iwgdfguidance.org/wp-content/uploads/2017/12/default_user_female.png";
    await firebase
      .database()
      .ref("user/" + id)
      .update({
        photo: photo
      });
    this.props.navigation.navigate("Main", {
      id: this.props.navigation.getParam("id"),
      email: email
    });
  };
  mainpage = () => {
    var em = this.props.navigation.getParam("email");
    var email = em.match(/^([^@]*)@/)[1];

    if (this.state.image == null) this.handleimage();
    else
      this.props.navigation.navigate("Main", {
        id: this.props.navigation.getParam("id"),
        email: email
      });
  };
  state = {
    image: null,
    uploading: false
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#6bd1e9"
        }}
      >
        <TouchableOpacity
          onPress={this._takePhoto}
          style={{
            width: "42%",
            borderRadius: 9,
            margin: "5%",
            backgroundColor: "#6bd1e9",
            top: screenHeight * 8,
            left: screenWidth,
            height: screenHeight * 7
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 28,
              textAlignVertical: "center"
            }}
          >
            Take a photo
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "black", fontSize: 19 }}>
          {" "}
          {"\n"}
          {"\n"}OR
        </Text>

        <TouchableOpacity
          onPress={this._pickImage}
          style={{
            width: "40%",
            margin: "5%",
            borderRadius: 9,
            backgroundColor: "#6bd1e9",
            top: screenHeight,
            left: screenWidth,
            height: screenHeight * 6.5
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 21,
              textAlignVertical: "center"
            }}
          >
            Upload from file
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.handleimage}
          style={{
            width: "60%",
            margin: "5%",
            top: screenHeight * 50,
            borderRadius: 9,
            backgroundColor: "#6bd1e9"
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 24,
              textAlignVertical: "center"
            }}
          >
            I will upload later
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.mainpage}
          style={{
            width: "60%",
            margin: "5%",
            top: screenHeight * -10,
            borderRadius: 9,
            backgroundColor: "#6bd1e9"
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 24,
              textAlignVertical: "center"
            }}
          >
            Go to main page
          </Text>
        </TouchableOpacity>

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center"
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2
        }}
      >
        <View
          style={{
            backgroundColor: "#6bd1e9",
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
            paddingTop: Platform.OS === "ios" ? 20 : 0
          }}
        >
          <Image
            backgroundColor="#6bd1e9"
            source={{ uri: image }}
            style={{
              left: screenWidth,
              top: screenHeight * 5,
              width: screenWidth * 60,
              height: screenHeight * 35,
              borderRadius: 150,
              backgroundColor: "#6bd1e9"
            }}
          />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    await this._handleImagePicked(pickerResult);
    await this._handleImagePicked(pickerResult);
    firebase
      .database()
      .ref("user/" + id)
      .update({
        photo: this.state.image
      });
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    await this._handleImagePicked(pickerResult);
    firebase
      .database()
      .ref("user/" + id)
      .update({
        photo: this.state.image
      });
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child("ksjdnf");
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

export default createAppContainer(
  createSwitchNavigator(
    {
      Login: Login,
      Signup: Signup,
      ForgetPassword: ForgetPassword,
      Main: Main,
      Pic: Pic
    },
    {
      initialRouteName: "Login"
    }
  )
);
