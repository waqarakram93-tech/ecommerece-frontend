import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => <footer className="page-footer font-small blue pt-4 mt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase mt-4 ">Knives Store</h5>
                <p>Welcome to your resource for all things cutlery, shaving, and security. Since 1995 the Knife Center has been giving you the best "Old Fashioned" service. Buy knives by browsing from over 20,000 products, including pocket knives for every use, outdoor, camping, and survival knives. </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />



            <div class="col-md-6   mx-auto mb-md-0 mb-4">

                <h6 class="text-uppercase fw-bold mb-4">
                    Contact
                </h6>
                <p><i class="bi bi-house-door-fill"></i>   Luisental 29, 28359 BREMEN GERMANY</p>
                <p><i class="bi bi-envelope-fill"></i>    info@knivestore.com </p>

                <p><i class="bi bi-telephone-fill"></i>    + 49 443 142 189</p>
                <p><i class="bi bi-printer-fill"></i>       + 49 234 567 89</p>
            </div>
        </div>
    </div>



</footer>

export default Footer