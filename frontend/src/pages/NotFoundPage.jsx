import React from 'react';

const NotFoundPage = () => {
  return (
    <>
      <style>
        {`

          .page_404 {
            padding: 80px 0;
            background: #fff;
            font-family: 'Arvo', serif;
          }

          .page_404 img {
            width: 50%;
          }

          .four_zero_four_bg {
            background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
            height: 400px;
            background-position: center;
          }

          .four_zero_four_bg h1 {
            font-size: 80px;
          }

          .four_zero_four_bg h3 {
            font-size: 80px;
          }

          .link_404 {
            color: #fff!important;
            padding: 10px 20px;
            background: #39ac31;
            margin: 20px 0;
            display: inline-block;
          }

          .contant_box_404 {
            margin-top: -10px;
          }
        `}
      </style>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">Looks like you're lost</h3>
                  <p>The page you are looking for is not available!</p>
                  <a href="/" className="link_404">Go to Home</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
