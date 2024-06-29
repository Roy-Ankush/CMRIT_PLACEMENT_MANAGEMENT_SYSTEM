import React from "react";
import './css/FPC.css'

const KycData = () => {
  return (
    <>
      <div className={`kyc-accordion-box`}>
        <div className={`kyc-accordion`}>
          <form action="">
            <h5 className={`text-center`}>VALIDATE KYC</h5>
            <hr />
            <div
              className={`accordion accordion-flush`}
              id="accordionFlushExample"
            >
              <div className={`accordion-item`}>
                <h2 className={`accordion-header`}>
                  <button
                    className={`accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Resumes
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className={`accordion-collapse collapse`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body`}>
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> className.
                    This is the first item's accordion body. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Iure, error incidunt
                    quasi optio cum iste velit cupiditate enim corrupti nobis
                    aliquam dignissimos ea ut? Facere fugiat eos debitis
                    placeat. Veritatis aut nulla repellendus iure nemo enim
                    possimus totam perferendis aperiam.
                  </div>
                </div>
              </div>
              <div className={`accordion-item`}>
                <h2 className={`accordion-header`}>
                  <button
                    className={`accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    College ID and Picture
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className={`accordion-collapse collapse`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body`}>
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> className.
                    This is the second item's accordion body. Let's imagine this
                    being filled with some actual content. Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Quas architecto delectus
                    magni doloremque sit fuga aliquam itaque, vitae expedita,
                    corporis alias reiciendis et culpa, corrupti nihil
                    repudiandae temporibus recusandae! Maiores!
                  </div>
                </div>
              </div>
              <div className={`accordion-item`}>
                <h2 className={`accordion-header`}>
                  <button
                    className={`accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    National IDs
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className={`accordion-collapse collapse`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body`}>
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> className.
                    This is the third item's accordion body. Nothing more
                    exciting happening here in terms of content, but just
                    filling up the space to make it look, at least at first
                    glance, a bit more representative of how this would look in
                    a real-world application.
                  </div>
                </div>
              </div>
              <div className={`accordion-item`}>
                <h2 className={`accordion-header`}>
                  <button
                    className={`accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    Marks Card
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className={`accordion-collapse collapse`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className={`accordion-body`}>
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> className.
                    This is the third item's accordion body. Nothing more
                    exciting happening here in terms of content, but just
                    filling up the space to make it look, at least at first
                    glance, a bit more representative of how this would look in
                    a real-world application.
                  </div>
                </div>
              </div>
            </div>
            <div>
              <select className={`kyc-status`} name="status" id="status">
                <option value="">Pending</option>
                <option value="">Approved</option>
                <option value="">Rejected</option>
              </select>
            </div>
            <div className={`comments-label`}>
              <label htmlFor="comments">Comments</label>
            </div>
            <textarea
              className={`comments`}
              name="comments"
              id="comments"
              rows={4}
            ></textarea>
            <div className={`kyc-button`}>
              <button className={`btn btn-primary`} type="submit">
                Submit
              </button>
              <button className={`btn btn-light`} type="reset">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default KycData;
