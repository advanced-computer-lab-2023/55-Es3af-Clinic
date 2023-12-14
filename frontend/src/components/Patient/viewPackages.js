import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PackageService from "../../services/packageService";
import MemberService from "../../services/familyMemberService";
import patientService from "../../services/patientService";
import Home from "../gohome";

const PkgListP = (props) => {
  const intialBody = {
    packageID: "",
    patients: [],
  };
  const intialMoney = {
    amount: 0,
    disc: 0,
  };
  const intialItems = {
    lineItems: [
      {
        quantity: 1,
        price_data: {
          currency: "egp",
          product_data: {
            name: "",
          },
          unit_amount: 0,
        },
      },
    ],
    success_url: "",
    cancel_url: "",
  };
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [body, setBody] = useState(intialBody);
  const [showBanner, setShowBanner] = useState(false);
  const [money, setMoney] = useState(intialMoney);
  const [cBody, setCBody] = useState(intialItems);
  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    retrievePkgs();
    retrieveMembers();
    retrievePatient();
  }, []);

  const retrievePkgs = () => {
    setLoading(true);
    PackageService.viewPackages()
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          const sortedPackages = response.data.sort(
            (a, b) => a.price - b.price
          );
          setUsers(sortedPackages);
        } else {
          // Handle the case where response.data is not an array
          console.log("Data is not an array:", response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const retrieveMembers = () => {
    MemberService.getAll()
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          const flattenedUsers = response.data.flat();
          setMembers(flattenedUsers);
        } else {
          // Handle the case where response.data is not an array
          console.log("Data is not an array:", response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [Ppkg, setPpkg] = useState("");
  const retrievePatient = () => {
    patientService
      .getPatient()
      .then((response) => {
        setPpkg(response.data.package);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleSubscribeClick = (pkgType, amnt, discount) => {
    setBody((prevBody) => ({
      ...prevBody,
      packageID: pkgType,
    }));
    setShowBanner(true);
    setMoney((prevMoney) => ({
      ...prevMoney,
      amount: amnt,
      disc: discount,
    }));
  };
  const membersWithPackage = members.filter((member) => member.package);
  const handleCheckboxChange = (memberId) => {
    setBody((prevBody) => {
      const isChecked = prevBody.patients.includes(memberId);

      if (isChecked) {
        const updatedBody = {
          ...prevBody,
          patients: prevBody.patients.filter((id) => id !== memberId),
        };
        return updatedBody;
      } else {
        const updatedBody = {
          ...prevBody,
          patients: [...prevBody.patients, memberId],
        };
        return updatedBody;
      }
    });
  };
  async function subscribe(e) {
    e.preventDefault();
    var finalAmnt = 0;
    console.log(body, money);
    if (body.patients.length > 1) {
      for (let i = -1; i < body.patients.length; i++) {
        finalAmnt += money.amount * (1 - money.disc);
      }
      setMoney(async (prevMoney) => {
        const updatedMoney = {
          ...prevMoney,
          amount: finalAmnt,
        };

        console.log("Updated Money State:", updatedMoney);

        try {
          const response = await patientService.withdrawFromWallet(
            updatedMoney
          );
          if (
            response.data.localeCompare("Amount deducted successfully") == 0
          ) {
            patientService
              .subscribeToAHealthPackage(body)
              .then((response1) => {
                alert(response1.data + "\n Amount deducted successfully");
                history("/patient");
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            alert(response.data);
            history("/patient");
          }
          //alert(updatedMoney.amount);
        } catch (e) {
          console.log(e);
        }

        return updatedMoney;
      });
    } else {
      try {
        const response = await patientService.withdrawFromWallet(money);
        if (response.data.localeCompare("Amount deducted successfully") == 0) {
          patientService
            .subscribeToAHealthPackage(body)
            .then((response1) => {
              alert(response1.data + "\n Amount deducted successfully");
              history("/patient/viewSubscribedPackages");
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          alert(response.data);
          history("/patient");
        }
        //alert(updatedMoney.amount);
      } catch (e) {
        console.log(e);
      }
    }
  }
  async function payWithCredit(e) {
    e.preventDefault();
    var finalAmnt = 0;
    if (body.patients.length > 1)
      for (let i = -1; i < body.patients.length; i++) {
        finalAmnt += money.amount * (1 - money.disc);
      }
    else finalAmnt = money.amount;
    setCBody(async (prevCBody) => {
      const updatedCBody = {
        lineItems: [
          {
            price_data: {
              currency: "egp",
              product_data: {
                name: body.packageID,
              },
              unit_amount: (finalAmnt * 100) / (body.patients.length + 1),
            },
            quantity: body.patients.length + 1,
          },
        ],
        success_url: "http://localhost:3000/patient/viewSubscribedPackages",
        cancel_url: "http://localhost:3000/patient",
      };
      console.log(updatedCBody);
      try {
        const response = await fetch(
          "http://localhost:8000/patient/createSession",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCBody),
          }
        );
        console.log(response);
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error(errorResponse); // Log the error details
          return;
        }

        const jsonResponse = await response.json();
        const { url } = jsonResponse;
        window.location = url;

        patientService
          .subscribeToAHealthPackage(body)
          .then((response1) => {
            alert(response1.data + "\n Amount deducted successfully");
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
      return updatedCBody;
    });
  }
  return (
    <div>
      <Home />
      <div className="App-header">
        {loading ? (
          <div className="preloader">
            <div className="loader">
              <div className="loader-outter"></div>
              <div className="loader-inner"></div>
              <div className="indicator">
                <svg width="16px" height="12px">
                  <polyline
                    id="back"
                    points="1 6 4 6 6 11 10 1 12 6 15 6"
                  ></polyline>
                  <polyline
                    id="front"
                    points="1 6 4 6 6 11 10 1 12 6 15 6"
                  ></polyline>
                </svg>
              </div>
            </div>{" "}
          </div>
        ) : (
          <div className="App-header">
            {users.length > 0 ? (
              users.map((user) => {
                const sessionDiscountPercentage = user.sessionDiscount * 100;
                const medicationDiscountPercentage =
                  user.medicationDiscount * 100;
                const familyMemberDiscountPercentage =
                  user.familyMemberDiscount * 100;

                return (
                  <div
                    className="card"
                    key={user._id}
                    style={{
                      width: 450,
                      backgroundColor: "#282c34",
                      margin: 10,
                    }}
                  >
                    <div className="card-body">
                      <h3
                        className="card-title"
                        style={{ color: `${user.type}` }}
                      >
                        {user.type} Package
                      </h3>
                      <h4 className="card-title" style={{ color: "white" }}>
                        {sessionDiscountPercentage}% Session Discount
                      </h4>
                      <h4 className="card-title" style={{ color: "white" }}>
                        {medicationDiscountPercentage}% Medication Discount
                      </h4>
                      <h4 className="card-title" style={{ color: "white" }}>
                        {familyMemberDiscountPercentage}% Family Member Discount
                      </h4>
                      <h4 className="card-title" style={{ color: "white" }}>
                        Price: {user.price} EGP
                      </h4>

                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleSubscribeClick(
                            user.type,
                            user.price,
                            user.familyMemberDiscount
                          )
                        }
                        disabled={Ppkg === user.type}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h2>No Packages Available</h2>
              </div>
            )}
          </div>
        )}
      </div>

      {showBanner && <div className="overlay"></div>}

      {showBanner && (
        <div className="member-banner">
          <div>
            {membersWithPackage.map((member) => (
              <label key={member.id} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  value={member.name}
                  checked={body.patients.includes(member._id)}
                  onChange={() => handleCheckboxChange(member._id)}
                />{" "}
                {member.name}
              </label>
            ))}
          </div>
          <div className="payment-buttons">
            <button className="btn btn-primary" onClick={subscribe}>
              Pay Using Wallet
            </button>
            <button className="btn btn-primary" onClick={payWithCredit}>
              Pay Using Credit Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PkgListP;
