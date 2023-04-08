import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import React from "react";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./Secondfile.css";
import "./FileUpload.css";
import FileUpload from "./FileUpload";
import Modal from "./Modal";
import Display from "./Display";
import Discordsvg from "./Discordsvg";
import Twittersvg from "./Twittersvg";
import Instagramsvg from "./Instagramsvg";
import SecureUpload from "./images/Secure Upload.png";
import ShareShield from "./images/Share Shield.png";
import AccessLock from "./images/Acesslock.png";

const Secondpage = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [data, setData] = useState("");
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
        <h1>Store your image with high-security</h1>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
      </div>

      <div className="brief-detail">
        <h1>What Services We Provide</h1>
        <div class="container">
          <section class="card">
            <img src={SecureUpload} alt="logo" />
            <h3>Secure Upload</h3>
            <p>
              A feature that allows users to upload files to the platform
              securely and with ease.
            </p>
            <a href="#" class="btn">
              More info
            </a>
          </section>
          <section class="card">
            <div class="icon standard">
              <img src={ShareShield} alt="logo" />
            </div>
            <h3>Share Shield</h3>
            <p>
              A feature that enables users to share files with others on the
              network while maintaining complete control over who can access
              them.
            </p>
            <a href="#" class="btn standard">
              More info
            </a>
          </section>
          <section class="card">
            <div class="icon premium">
              <img src={AccessLock} alt="logo" />
            </div>
            <h3>Acess Lock</h3>
            <p>
              A feature that provides advanced access control mechanisms,
              allowing users to revoke permissions from anyone they have shared
              their files with.
            </p>
            <a href="#" class="btn premium">
              More info
            </a>
          </section>
        </div>
      </div>

      <div className="upload-check-section">
        <Display contract={contract} account={account}></Display>
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
