import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../../config/history'
import TopSlider from '../../common/components/TopSlider'
import actions from './actions'

const mapStateToProps = state =>{
    console.log('state', state)
    const {siteReducer} = state
    return {siteReducer}
}

 class index extends Component {

    constructor(props) {
        super(props);
        this.state={
            siteDataList:[]
        }
    }
    

    async componentDidMount() {
        await this.getSites()
        // await this.addClients()
    }

    getSites = async () => {
        let params = {
            limit: 10,
            offset: 0
        }
        await this.props.getSites(params)


        if (this.props.siteReducer.siteData.success) {
            this.setState({
                siteDataList: this.props.siteReducer.siteData.sites
            })
        }

        console.log('this.state.siteDataList', this.state.siteDataList)
    }


    render() {
        return (
            <section className="cont-ara">
            <div class="list-area">
                <TopSlider />

                <div class="lst-bt-nav">
                    <div class="table table-ara">
                        <div class="top-fil-ara">

                            <div class="cap">
                                <h4>Sites</h4>
                            </div>

                            <div class="btn-ara">
                                <button class="btn btn-top"><img src="/images/color-wheel.svg" />Icon & color info</button>
                                <button class="btn btn-top"><img src="/images/export.svg" />Export EXL</button>
                                <button class="btn btn-top"><img src="/images/mail.svg" />Email</button>
                                <button class="btn btn-top"><img src="/images/colmns.svg" />Column Window</button>
                                <button class="btn btn-top"><img src="/images/reset-column.svg" />Reset  Columns</button>
                            </div>

                            <div class="sr-sec">
                                <form>
                                    <input type="text" class="form-control" placeholder="Search" />
                                    <button type="submit" class="btn btn-search"> <img src="/images/serach.svg" /> </button>
                                </form>
                            </div>
                            <div class="fil-btn">
                                <button class="btn btn-add" onClick={() => { this.props.history.push('/addSite') }}> <span class="icon"> <img src="/images/add-new-region.svg" /></span>Add New Site</button>
                            </div>
                        </div>

                        <div class="list-sec">
                            <div class="table-section">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th class="img-sq-box">
                                                <img src="/images/table-blue-dots.svg" />
                                            </th>
                                            <th class="">Site Code</th>
                                            <th class="">Site Name</th>
                                            <th class="">Display Name</th>
                                            <th class="">Consultancy</th>
                                            <th class="">Client</th>
                                            <th class="">Region</th>
                                            <th class=""> Client User</th>
                                            <th class="">Consultancy User</th> 
                                            <th class="">Comments</th>
                                            <th class="">Created At</th>
                                            <th class="">Updated At</th>
                                            {/* <th class="">Consultancy   <span class="rop-icon"> <img src="/images/down-arrow.svg"/> </span> </th>
                                   <th class="">Client <span class="rop-icon"> <img src="/images/down-arrow.svg"/> </span></th>
                                   <th class="">Associated Project <span class="rop-icon"> <img src="/images/down-arrow.svg"/> </span></th>
                                   <th class="cus-usr">Consultancy User</th> */}
                                            <th class="action">
                                                <img src="/images/three-dots.svg" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.siteDataList.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td class="img-sq-box">
                                                        <img src="/images/table-blue-dots.svg" />
                                                    </td>
                                                    <td>{item.code}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.display_name ? item.display_name : '-'}</td>
                                                    <td>{item.consultancy.name}</td>
                                                    <td>{item.client.name}</td>
                                                    <td>{item.region.name}</td>
                                                    <td> - </td>
                                                    <td> - </td>
                                                    <td>{item.comments ? item.comments :'-'}</td>
                                                    <td>{item.created_at}</td>
                                                    <td>{item.updated_at}</td>
                                                    {/* <td>
                                        <div class="usr-vw">
                                            <div class="amd"> 150 User</div>
                                            <div class="usr-sld">
                                                <div class="slider usr-sld-slider">
                                                 
                                                    <div class="slide">
                                                        <a href="">
                                                            <img src="/images/profileimg.jpg"/>
                                                        </a>
                                                    </div>
                                                    <div class="slide">
                                                        <a href="">
                                                            <img src="/images/profileimg.jpg"/>
                                                        </a>
                                                    </div>
                                                    <div class="slide">
                                                        <a href="">
                                                            <img src="/images/profileimg.jpg"/>
                                                        </a>
                                                    </div>
                                                    <div class="slide">
                                                        <a href="">
                                                            <img src="/images/profileimg.jpg"/>
                                                        </a>
                                                    </div>
                                                    <div class="slide">
                                                        <a href="">
                                                            <img src="/images/profileimg.jpg"/>
                                                        </a>
                                                    </div> <div class="slide">
                                                        <a href="">
                                                            <img src="/images/profileimg.jpg"/>
                                                        </a>
                                                    </div> <div class="slide">
                                                        <a href="">
                                                            <img src="/images/profileimg.jpg"/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td> */}

                                                    <td class="action">
                                                        <img src="/images/three-dots.svg" data-toggle="dropdown" />
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li ><a style={{cursor:"pointer"}} onClick={()=>{history.push('/editSite',{"siteItem":item,"client_id":item.client.id,"consultancy_id":item.consultancy.id,"region_id":item.region.id})}}><img src="/images/edit.svg" />Edit</a></li>
                                                            <li><a style={{cursor:"pointer"}}><img src="/images/delete.svg" />Delete</a></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="fot-nav">
                        <ul class="pagnation">
                            <li class="active">
                                <a href="#">01</a>
                            </li>
                            <li>
                                <a href="#">02</a>
                            </li>
                            <li>
                                <a href="#">03</a>
                            </li>
                        </ul>
                        <ul class="pagnation prv-nxt">
                            <li>
                                <a href="#" class="prv"> <img src="/images/lft-arrow.svg" /> Prev</a>
                            </li>
                            <li>
                                <a href="#" class="nxt">Next <img src="/images/rgt-arrow.svg" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default connect(mapStateToProps, {...actions})(index)