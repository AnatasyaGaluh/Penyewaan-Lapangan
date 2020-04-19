import React from 'react';

export default class LapanganItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            
        }
    }

    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    addToCart = (item) => {
        let oldItems = JSON.parse(localStorage.getItem('cart')) || []
        let newid = item.id
        let match = oldItems.find(({ id }) => id === newid);
        if (match)
        {
                match['total'] = match['total'] + (item.price * parseInt(this.state.quantity));
        }
        else
        {
            let newItem = {
                'id': item.id,
                'nama': item.nama,
                'harga': item.harga,
                'total': item.price * parseInt(this.state.quantity)
            };
            oldItems.push(newItem);
        }
        localStorage.setItem('cart', JSON.stringify(oldItems));
      }

      render(){
        const { item } = this.props;
        return (
            <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100" style={{ marginBottom: "10px"}}>
                <a href="#"><img className="card-img-top" src={'http://localhost/lapangan/public/images/' + item.gambar} alt="" /></a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href="#">{item.nama}</a>
                        </h4>
                        <h5>Rp. {item.harga}</h5>
                        <button className="btn btn-sm btn-warning" 
                            onClick={() =>this.addToCart(item)}>Checkout</button>
                        
                        </div>
                </div>
            </div>
       )
    }


}
