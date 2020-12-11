import React, { Component } from "react";
import { connect } from "react-redux";
import TopSlider from "../../common/components/TopSlider";
import actions from "./actions";
import commonActions from "../actions";
import ToastMsg from "../../common/ToastMessage";
import history from "../../../config/history";

const mapStateToProps = state => {
    const { buildingReducer, settingsCommonReducer } = state;

    console.log("state", state);

    return { buildingReducer, settingsCommonReducer };
};

class editBuilding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consultancy_id: "",
            consultancyIdList: [],
            clientIdList: [],
            regionIdList: [],
            client_id: "",
            region_id: "",
            siteIdList: [],
            site_id: "",

            siteErrorMsg: false,
            consultancyErrorMsg: false,
            clientErrorMsg: false,
            regionErrorMsg: false,
            nameErrorMsg: false,

            name: "",
            display_name: "",
            zip_code: "",
            city: "",
            state: "",
            year: "",
            country: "",
            ownership: "",
            ownership_type: "",
            use: "",
            area: 0,
            number: "",
            cost: 0,
            enterprise_index: "",
            manager: "",
            street: "",
            ministry: "",
            description: "",
            comments: "",

            building_id: ""
        };
    }

    componentDidMount = async () => {
        console.log("this.props.history.location.state", this.props.history.location.state);
        await this.props.getConsultancyDropdown();
        await this.setState({
            consultancyIdList: this.props.settingsCommonReducer.consultancyDropdownData.data,
            name: this.props.history.location.state.buildingItem.name,
            display_name: this.props.history.location.state.buildingItem.display_name,
            zip_code: this.props.history.location.state.buildingItem.zip_code,
            city: this.props.history.location.state.buildingItem.city,
            state: this.props.history.location.state.buildingItem.state,
            year: this.props.history.location.state.buildingItem.year,
            country: this.props.history.location.state.buildingItem.country,
            ownership: this.props.history.location.state.buildingItem.ownership,
            ownership_type: this.props.history.location.state.buildingItem.ownership_type,
            use: this.props.history.location.state.buildingItem.use,
            area: this.props.history.location.state.buildingItem.area,
            number: this.props.history.location.state.buildingItem.number,
            cost: this.props.history.location.state.buildingItem.cost,
            enterprise_index: this.props.history.location.state.buildingItem.enterprise_index,
            manager: this.props.history.location.state.buildingItem.manager,
            street: this.props.history.location.state.buildingItem.street,
            ministry: this.props.history.location.state.buildingItem.ministry,
            description: this.props.history.location.state.buildingItem.description,
            comments: this.props.history.location.state.buildingItem.comments,

            consultancy_id: this.props.history.location.state.consultancy_id,
            client_id: this.props.history.location.state.client_id,
            region_id: this.props.history.location.state.region_id,
            site_id: this.props.history.location.state.site_id,

            building_id: this.props.history.location.state.buildingItem.id
        });

        let clientParam = {
            consultancy_id: this.state.consultancy_id
        };
        this.getClientDropdown(clientParam);

        let regionParams = {
            client_id: this.state.client_id
        };
        this.getRegionDropdown(regionParams);

        let siteParams = {
            region_id: this.state.region_id
        };
        this.getSiteDropdown(siteParams);
    };

    getClientDropdown = async params => {
        await this.props.getClientDropdown(params);
        await this.setState({
            clientIdList: this.props.settingsCommonReducer.clientDropdownData.data
        });
    };

    getRegionDropdown = async params => {
        await this.props.getRegionDropdown(params);
        await this.setState({
            regionIdList: this.props.settingsCommonReducer.regionDropdownData.data
        });
    };

    getSiteDropdown = async params => {
        await this.props.getSitesDropdown(params);
        await this.setState({
            siteIdList: this.props.settingsCommonReducer.siteDropdownData.data
        });
        console.log("this.state.siteIdList", this.state.siteIdList);
    };

    selectConsultancyId = async e => {
        await this.setState({ consultancy_id: e.target.value, consultancyErrorMsg: false });

        let params = {
            consultancy_id: this.state.consultancy_id
        };
        this.getClientDropdown(params);
    };

    selectClientId = async e => {
        await this.setState({ client_id: e.target.value, clientErrorMsg: false });
        let params = {
            client_id: this.state.client_id
        };
        this.getRegionDropdown(params);
    };

    selectRegionId = async e => {
        await this.setState({ region_id: e.target.value, regionErrorMsg: false });
        let params = {
            region_id: this.state.region_id
        };
        this.getSiteDropdown(params);
    };

    editBuilding = async () => {
        console.log("this.state", this.state);

        if (this.state.name === "") {
            this.setState({ nameErrorMsg: true });
        }
        if (this.state.consultancy_id === "") {
            this.setState({ consultancyErrorMsg: true });
        }
        if (this.state.client_id === "") {
            this.setState({ clientErrorMsg: true });
        }
        if (this.state.region_id === "") {
            this.setState({ regionErrorMsg: true });
        }
        if (this.state.site_id === "") {
            this.setState({ siteErrorMsg: true });
        }
        if (
            this.state.name != "" &&
            this.state.consultancy_id != "" &&
            this.state.client_id != "" &&
            this.state.region_id != "" &&
            this.state.site_id != ""
        ) {
            let rec_data = new FormData();
            rec_data.append("building[name]", this.state.name);
            rec_data.append("building[region_id]", this.state.region_id);
            rec_data.append("building[comments]", this.state.comments);
            rec_data.append("building[display_name]", this.state.display_name);
            rec_data.append("building[consultancy_id]", this.state.consultancy_id);
            rec_data.append("building[client_id]", this.state.client_id);
            rec_data.append("building[site_id]", this.state.site_id);
            rec_data.append("building[zip_code]", this.state.zip_code);
            rec_data.append("building[city]", this.state.city);
            rec_data.append("building[state]", this.state.state);
            rec_data.append("building[year]", this.state.year);
            rec_data.append("building[country]", this.state.country);
            rec_data.append("building[ownership]", this.state.ownership);
            rec_data.append("building[ownership_type]", this.state.ownership_type);
            rec_data.append("building[use]", this.state.use);
            rec_data.append("building[area]", this.state.area);
            rec_data.append("building[number]", this.state.number);
            rec_data.append("building[cost]", this.state.cost);
            rec_data.append("building[enterprise_index]", this.state.enterprise_index);
            rec_data.append("building[manager]", this.state.manager);
            rec_data.append("building[street]", this.state.street);
            rec_data.append("building[ministry]", this.state.ministry);
            rec_data.append("building[description]", this.state.description);
            let id = this.state.building_id;
            await this.props.editBuilding(rec_data, id);
            ToastMsg(this.props.buildingReducer.editBuildingData.message, "info");
            if (this.props.buildingReducer.editBuildingData.success) {
                history.push("/buildings");
            }
        }
    };

    render() {
        return (
            <section className="cont-ara">
                <div className="fst">
                    <TopSlider />

                    <div className="dash-cont">
                        <div className="pub-ara six">
                            <div className="frm-ara">
                                <div className="top-ara">
                                    <h4>Edit Building</h4>
                                </div>

                                <div className="head">
                                    <h3>Basic Info</h3>
                                </div>
                                <div className="frm">
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">01</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label
                                                    className="form-control-placeholder"
                                                    style={{ color: this.state.nameErrorMsg ? "red" : null }}
                                                    for="f-name"
                                                >
                                                    Building Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.name}
                                                    onChange={e => {
                                                        this.setState({ name: e.target.value, nameErrorMsg: false });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Building Name "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">02</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group select-group">
                                                <label
                                                    className="form-control-placeholder"
                                                    style={{ color: this.state.consultancyErrorMsg && "red" }}
                                                    for="f-name"
                                                >
                                                    Consultancy *
                                                </label>
                                                <select
                                                    className="form-control select"
                                                    value={this.state.consultancy_id}
                                                    onChange={e => {
                                                        this.selectConsultancyId(e);
                                                    }}
                                                >
                                                    <option value="">Select</option>
                                                    {this.state.consultancyIdList.length &&
                                                        this.state.consultancyIdList.map((item, idex) => {
                                                            return <option value={item.id}> {item.name} </option>;
                                                        })}
                                                </select>
                                                {/* <input type="text-area" id="text"  className="form-control" placeholder=" " /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">03</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group select-group">
                                                <label
                                                    className="form-control-placeholder"
                                                    style={{ color: this.state.clientErrorMsg && "red" }}
                                                    for="f-name"
                                                >
                                                    Client *
                                                </label>
                                                <select
                                                    className="form-control select"
                                                    value={this.state.client_id}
                                                    onChange={e => {
                                                        this.selectClientId(e);
                                                    }}
                                                >
                                                    <option value="">Select</option>
                                                    {this.state.clientIdList &&
                                                        this.state.clientIdList.map((item, idex) => {
                                                            return <option value={item.id}> {item.name} </option>;
                                                        })}
                                                </select>
                                                {/* <input type="text-area" id="text"  className="form-control" placeholder=" " /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">04</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group select-group">
                                                <label
                                                    className="form-control-placeholder"
                                                    style={{ color: this.state.regionErrorMsg && "red" }}
                                                    for="f-name"
                                                >
                                                    Region *
                                                </label>
                                                <select
                                                    className="form-control select"
                                                    value={this.state.region_id}
                                                    onChange={e => {
                                                        this.selectRegionId(e);
                                                    }}
                                                >
                                                    <option value="">Select</option>
                                                    {this.state.regionIdList.length &&
                                                        this.state.regionIdList.map((item, idex) => {
                                                            return <option value={item.id}> {item.name} </option>;
                                                        })}
                                                </select>
                                                {/* <input type="text-area" id="text"  className="form-control" placeholder=" " /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">05</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group select-group">
                                                <label
                                                    className="form-control-placeholder"
                                                    style={{ color: this.state.siteErrorMsg && "red" }}
                                                    for="f-name"
                                                >
                                                    Site *
                                                </label>
                                                <select
                                                    className="form-control select"
                                                    value={this.state.site_id}
                                                    onChange={e => {
                                                        this.setState({ site_id: e.target.value, siteErrorMsg: false });
                                                    }}
                                                >
                                                    <option value="">Select</option>
                                                    {this.state.siteIdList.length &&
                                                        this.state.siteIdList.map((item, idex) => {
                                                            return <option value={item.id}> {item.name} </option>;
                                                        })}
                                                </select>
                                                {/* <input type="text-area" id="text"  className="form-control" placeholder=" " /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">06</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Display Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.display_name}
                                                    onChange={e => {
                                                        this.setState({ display_name: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Display Name "
                                                    list="builiding"
                                                    name="builiding"
                                                />
                                                {/* <span className="material-icons">keyboard_arrow_down </span> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">07</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.description}
                                                    onChange={e => {
                                                        this.setState({ description: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Description "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">08</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Building Number
                                                </label>
                                                <input
                                                    type="number"
                                                    id="text"
                                                    value={this.state.number}
                                                    onChange={e => {
                                                        this.setState({ number: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Building Number"
                                                    list="buildigNumber"
                                                    name="buildigNumber"
                                                />
                                                {/* <span className="material-icons">keyboard_arrow_down </span> */}
                                                <datalist id="buildigNumber">
                                                    <option value="Buildig Number" />
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="itm">
                                    <div className="cunt">
                                        <div className="numb">09</div>
                                    </div>
                                    <div className="itm-cnt">
                                        <div className="form-group">
                                            <label className="form-control-placeholder" for="f-name">Associated Projects</label>
                                            <input type="text" id="text" className="form-control" placeholder="Enter Associated Project " list="associated" name="associated" />
                                            <span className="material-icons">keyboard_arrow_down </span>
                                            <datalist id="associated">
                                                <option value="Buildig Number" />
                                            </datalist>
                                        </div>
                                    </div>
                                </div> */}
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">09</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Consultancy Users
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    className="form-control"
                                                    placeholder="Enter Consultancy Users "
                                                    list="cosultancy"
                                                    name="cosultancy"
                                                />
                                                <span className="material-icons">keyboard_arrow_down </span>
                                                <datalist id="cosultancy">
                                                    <option value="Buildig Number" />
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">10</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Client Users
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    className="form-control"
                                                    placeholder="Enter Client Users "
                                                    list="client-u"
                                                    name="client-u"
                                                />
                                                <span className="material-icons">keyboard_arrow_down </span>
                                                <datalist id="client-u">
                                                    <option value="Buildig Number" />
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="head mt-4">
                                    <h3>More Info</h3>
                                </div>
                                <div className="frm">
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">01</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Area (Sq)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="text"
                                                    value={this.state.area}
                                                    onChange={e => {
                                                        this.setState({ area: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Area (Sq) "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">02</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Cost
                                                </label>
                                                <input
                                                    type="number"
                                                    id="text"
                                                    value={this.state.cost}
                                                    onChange={e => {
                                                        this.setState({ cost: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Cost "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">03</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Enterprice Index
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.enterprise_index}
                                                    onChange={e => {
                                                        this.setState({ enterprise_index: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Enterprice Index "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">04</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Ownership
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.ownership}
                                                    onChange={e => {
                                                        this.setState({ ownership: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Ownership "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">05</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Ownership Type
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.ownership_type}
                                                    onChange={e => {
                                                        this.setState({ ownership_type: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Ownership Type"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">06</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Use
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.use}
                                                    onChange={e => {
                                                        this.setState({ use: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Use "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">07</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Manager
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.manager}
                                                    onChange={e => {
                                                        this.setState({ manager: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Manager "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">08</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Year Built
                                                </label>
                                                <input
                                                    type="number"
                                                    id="text"
                                                    value={this.state.year}
                                                    onChange={e => {
                                                        this.setState({ year: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Year Built "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">09</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Ministry
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.ministry}
                                                    onChange={e => {
                                                        this.setState({ ministry: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Ministry "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="head mt-4">
                                    <h3>Address</h3>
                                </div>
                                <div className="frm">
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">01</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Street
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.street}
                                                    onChange={e => {
                                                        this.setState({ street: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Street "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">02</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.city}
                                                    onChange={e => {
                                                        this.setState({ city: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter City "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">03</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    State
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.state}
                                                    onChange={e => {
                                                        this.setState({ state: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter State "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">04</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.country}
                                                    onChange={e => {
                                                        this.setState({ country: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Country"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">05</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Zip Code
                                                </label>
                                                <input
                                                    type="number"
                                                    id="text"
                                                    value={this.state.zip_code}
                                                    onChange={e => {
                                                        this.setState({ zip_code: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Zip Code "
                                                    list="zip"
                                                    name="zip"
                                                />
                                                {/* <span className="material-icons">keyboard_arrow_down </span> */}
                                                <datalist id="zip">
                                                    <option value="686541" />
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="itm">
                                        <div className="cunt">
                                            <div className="numb">06</div>
                                        </div>
                                        <div className="itm-cnt">
                                            <div className="form-group">
                                                <label className="form-control-placeholder" for="f-name">
                                                    Comments
                                                </label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={this.state.comments}
                                                    onChange={e => {
                                                        this.setState({ comments: e.target.value });
                                                    }}
                                                    className="form-control"
                                                    placeholder="Enter Comments "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="frm btn-sec">
                                    <button
                                        className="btn btn-submit"
                                        onClick={() => {
                                            this.editBuilding();
                                        }}
                                    >
                                        {" "}
                                        <i className="material-icons tic"> check</i>Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(mapStateToProps, { ...actions, ...commonActions })(editBuilding);
