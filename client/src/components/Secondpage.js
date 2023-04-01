import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import React from "react";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./Secondfile.css";
import FileUpload from "./FileUpload";
import Modal from "./Modal";
import Display from "./Display";
import Discordsvg from "./Discordsvg";
import Twittersvg from "./Twittersvg";
import Instagramsvg from "./Instagramsvg";

const Secondpage = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      {/* Navbar section */}
      <div className="navbar-section">
        <Navbar />
      </div>

      
      <div className="file-container">
        <button className="upload-file-button"></button>
      </div>

      <div className="brief-detail">
        <h1>How The Image Uploading Works</h1>
      </div>

      <div className="upload-check-sectionS">
        
      </div>

      <div className="footer-section">
        <div className="columns">
          <div className="column">
            <h2 className="column1-heading">Secure ShareX</h2>
            <p className="column1-para">
              © 2023 Secure ShareX. All rights reserved
            </p>
          </div>

          <div className="column">
            <h2 className="column2-text">Get involved</h2>
            <div className="social-icons">
              <Discordsvg />
              <Twittersvg />
              <Instagramsvg />
            </div>
          </div>

          <div className="column">
            <h2 className="Colum3-heading">Contact Us</h2>
            <p className="Column3-text">SecureShareX@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Secondpage;
