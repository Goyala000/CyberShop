import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;


    return (
            <footer className="page-footer font-small bg-primary ">

                <div className="color-white">
                    <div className="container">

                <div className="row py-4 d-flex align-items-center">
                    <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                        <h6 className="mb-0 whiteCol">Get connected with us on social networks!</h6>
                    </div>
                    <div className="col-md-6 col-lg-7 text-center text-md-right">

        <a href="#facebook" className="fb-ic">
          <i className="fab fa-facebook-f white-text mr-4 whiteCol"> </i>
        </a>
        <a href="#twitter" className="tw-ic">
          <i className="fab fa-twitter white-text mr-4 whiteCol"> </i>
        </a>
        <a href="#gplus" className="gplus-ic">
          <i className="fab fa-discord white-text mr-4 whiteCol"> </i>
        </a>
        <a href="#instagram" className="ins-ic">
          <i className="fab fa-instagram white-text whiteCol"> </i>
        </a>

      </div>

    </div>

  </div>
</div>

<div className="container text-center text-md-left pt-4 pt-md-5">

  <div className="row mt-1 mt-md-0 mb-4 mb-md-0">

    <div className="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

      <h5 className="whiteCol">About Us</h5>
      <hr className="color-primary mb-4 mt-0 d-inline-block mx-auto w-60" />

      <p className="foot-desc mb-0 whiteCol">CyberPunk is a eCommerce site for buying different
      sorts of Computer Parts. Grab them at great price with great quality.</p>

    </div>

    <hr className="clearfix w-100 d-md-none" />

    <div className="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4 useFul">

      <h5 className="whiteCol">Products</h5>
      <hr className="color-primary mb-4 mt-0 d-inline-block mx-auto w-60" />

      <ul className="list-unstyled foot-desc whiteCol">
        <li className="mb-2 whiteCol">
          <a href="#!" className="whiteCol">HeadPhone</a>
        </li>
        <li className="mb-2">
          <a href="#!" className="whiteCol">Laptop</a>
        </li>
        <li className="mb-2">
          <a href="#!" className="whiteCol">Mouse</a>
        </li>
        <li className="mb-2">
          <a href="#!" className="whiteCol">Keyboard</a>
        </li>
      </ul>

    </div>

    <hr className="clearfix w-100 d-md-none" />

    <div className="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4 useFul">

      <h5 className="whiteCol">Useful links</h5>
      <hr className="color-primary mb-4 mt-0 d-inline-block mx-auto w-60" />

      <ul className="list-unstyled foot-desc">
        <li className="mb-2">
          <a href="#!" className="whiteCol">Your Account</a>
        </li>
        <li className="mb-2">
          {userInfo ? <a href="#!" className="whiteCol">Log Out</a> : <a href="#!" className="whiteCol">Register</a>}
        </li>
        <li className="mb-2">
          <a href="/cart" className="whiteCol">Cart</a>
        </li>
        <li className="mb-2">
          <a href="#!" className="whiteCol">Help</a>
        </li>
      </ul>

    </div>

    <hr className="clearfix w-100 d-md-none" />

    <div className="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

      <h5 className="whiteCol">Contacts</h5>
      <hr className="color-primary mb-4 mt-0 d-inline-block mx-auto w-60" />

      <ul className="fa-ul foot-desc ml-4">
        <li className="mb-2 whiteCol"><span className="fa-li"><i className="far fa-map whiteCol"></i></span>Kathmandu, Nepal
        </li>
        <li className="mb-2 whiteCol"><span className="fa-li"><i className="fas fa-phone-alt whiteCol"></i></span>9999999999</li>
        <li className="mb-2 whiteCol"><span className="fa-li"><i className="far fa-envelope whiteCol"></i></span>cyberpunk@admin.com</li>
        <li className="mb-2 whiteCol"><span className="fa-li"><i className="far fa-clock whiteCol"></i></span>Sunday - Friday: 10-17</li>
      </ul>

    </div>

  </div>

</div>

<div className="footer-copyright text-center py-3 whiteCol">© 2021 Copyright:
  <a href="#cyberShop" className="whiteCol"> CyberShop</a>
</div>
</footer>
    )
}

export default Footer;
