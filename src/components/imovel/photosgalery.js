
export function PhotosGalery({product}){
    return(
        <>
                          <h4 className="title-2">Fotos da Galeria</h4>
                  <div className="ltn__property-details-gallery mb-30">
                    <div className="row">
                      <div className="col-md-6">
             
                          <img
                            className="mb-30"
                            src={`/img/others/${product.gallery.img1}`}
                            alt={`${product.title}`}
                          />
                     
              
                          <img
                            className="mb-30"
                            src={`/img/others/${product.gallery.img2}`}
                            alt={`${product.title}`}
                          />
                    
                      </div>
                      <div className="col-md-6">
          
                          <img
                            className="mb-30"
                            src={`/img/others/${product.gallery.img3}`}
                            alt={`${product.title}`}
                          />
                  
                      </div>
                    </div>
                  </div>
        </>
    )
}