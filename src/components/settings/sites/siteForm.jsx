import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

import history from "../../../config/history";
import ToastMsg from "../../common/ToastMessage";
import TopSlider from "../../common/components/TopSlider";
import actions from "./actions";
import commonActions from "../actions";
import Breadcrumb from "../../common/components/Breadcrumb";

class editSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siteParams: {
                name: null,
                display_name: null,
                consultancy_id: null,
                client_id: null,
                region_id: null,
                comments: null
            },
            errorParams: {
                name: false,
                consultancy_id: false,
                client_id: false,
                region_id: false
            },
            consultancyIdList: [],
            clientIdList: [],
            regionIdList: []
        };
    }

    componentDidMount = async () => {
        await this.props.getConsultancyDropdown();
        await this.setState({
            consultancyIdList: this.props.settingsCommonReducer.consultancyDropdownData.data
        });
        if (this.props.history.location.state && this.props.history.location.state.siteItem) {
            let tempSiteParam = this.props.history.location.state.siteItem;
            tempSiteParam.client_id = tempSiteParam.client.id;
            tempSiteParam.consultancy_id = tempSiteParam.consultancy.id;
            tempSiteParam.region_id = tempSiteParam.region.id;
            this.getClientDropdown(this.props.history.location.state.consultancy_id);
            this.getRegionDataDropdown(this.props.history.location.state.client_id);
            await this.setState({
                siteParams: tempSiteParam,
                isEdit: true
            });
        }
    };

    getClientDropdown = async consultancy_id => {
        await this.props.getClientDropdown({ consultancy_id });
        await this.setState({
            clientIdList: this.props.settingsCommonReducer.clientDropdownData.data
        });
    };

    getRegionDataDropdown = async client_id => {
        await this.props.getRegionDropdown({ client_id });
        await this.setState({
            regionIdList: this.props.settingsCommonReducer.regionDropdownData.data
        });
    };

    selectConsultancyId = async consultancy_id => {
        const { siteParams } = this.state;
        await this.setState({
            siteParams: {
                ...siteParams,
                consultancy_id
            }
        });
        this.getClientDropdown(consultancy_id);
    };

    selectClientId = async client_id => {
        const { siteParams } = this.state;
        await this.setState({
            siteParams: {
                ...siteParams,
                client_id
            }
        });
        this.getRegionDataDropdown(client_id);
    };

    validate = () => {
        const { siteParams } = this.state;
        let errorParams = {
            name: false,
            consultancy_id: false,
            client_id: false,
            region_id: false
        };
        let showErrorBorder = false;
        if (!siteParams.name || !siteParams.name.trim().length) {
            errorParams.name = true;
            showErrorBorder = true;
        }
        if (!siteParams.consultancy_id || !siteParams.consultancy_id.trim().length) {
            errorParams.consultancy_id = true;
            showErrorBorder = true;
        }
        if (!siteParams.client_id || !siteParams.client_id.trim().length) {
            errorParams.client_id = true;
            showErrorBorder = true;
        }
        if (!siteParams.region_id || !siteParams.region_id.trim().length) {
            errorParams.region_id = true;
            showErrorBorder = true;
        }
        this.setState({
            showErrorBorder,
            errorParams
        });

        if (showErrorBorder) return false;
        return true;
    };

    editSite = async () => {
        const { siteParams } = this.state;
        if (this.validate()) {
            await this.props.editSiteById(siteParams, siteParams.id);
            ToastMsg(this.props.siteReducer.editSiteData.message, "info");
            if (this.props.siteReducer.editSiteData.success) {
                history.push("/sites");
            }
        }
    };

    addSite = async () => {
        const { siteParams } = this.state;
        if (this.validate()) {
            await this.props.addSite(siteParams);
            ToastMsg(this.props.siteReducer.addSiteData.message, "info");
            if (this.props.siteReducer.addSiteData.success) {
                history.push("/sites");
            }
        }
    };

    render() {
        const { siteParams, consultancyIdList, clientIdList, showErrorBorder, errorParams, isEdit, regionIdList } = this.state;
        return (
            <section className="cont-ara act-main">
                <div className="list-area">
                    <ToastContainer />
                    <TopSlider />
                    <div className="lst-bt-nav create">
                        <div className="table table-ara">
                            <div className="list-sec">
                                <div className="nav-ara">
                                    <div className="head">
                                        <h4>{isEdit ? "Edit" : "Add"} Site</h4>
                                    </div>
                                    {/* <Breadcrumb /> */}
                                </div>
                            </div>
                            <div className="form-area">
                                {isEdit ? (
                                    <div className="itm">
                                        <div className="form-group">
                                            <label>Code</label>
                                            <input type="text" className="form-control" placeholder="" value={siteParams.code} disabled={true} />
                                        </div>
                                    </div>
                                ) : null}
                                <div className="itm">
                                    <div className="form-group">
                                        <label className={`${showErrorBorder && errorParams.name ? "text-red " : ""}form-control-placeholder`}>
                                            Site Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={siteParams.name}
                                            onChange={e => {
                                                this.setState({
                                                    siteParams: {
                                                        ...siteParams,
                                                        name: e.target.value
                                                    }
                                                });
                                            }}
                                            className="form-control"
                                            placeholder="Enter Site Name"
                                        />
                                    </div>
                                </div>

                                <div className="itm">
                                    <div className="form-group">
                                        <label className="form-control-placeholder">Display Name</label>
                                        <input
                                            type="text"
                                            value={siteParams.display_name}
                                            onChange={e => {
                                                this.setState({
                                                    siteParams: {
                                                        ...siteParams,
                                                        display_name: e.target.value
                                                    }
                                                });
                                            }}
                                            className="form-control"
                                            placeholder="Enter Display Name"
                                        />
                                    </div>
                                </div>

                                <div className="itm">
                                    <div className="form-group select-group">
                                        <label
                                            className={`${showErrorBorder && errorParams.consultancy_id ? "text-red " : ""}form-control-placeholder`}
                                        >
                                            Consultancy *
                                        </label>
                                        <div className="custom-selecbox">
                                            <select
                                                className="form-control custom-selecbox"
                                                value={siteParams.consultancy_id}
                                                onChange={e => {
                                                    this.selectConsultancyId(e.target.value);
                                                }}
                                            >
                                                <option value="">Select</option>
                                                {consultancyIdList.length &&
                                                    consultancyIdList.map((item, idex) => {
                                                        return <option value={item.id}> {item.name} </option>;
                                                    })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="itm">
                                    <div className="form-group select-group">
                                        <label className={`${showErrorBorder && errorParams.client_id ? "text-red " : ""}form-control-placeholder`}>
                                            Client *
                                        </label>
                                        <div className="custom-selecbox">
                                            <select
                                                className="form-control custom-selecbox"
                                                value={siteParams.client_id}
                                                onChange={e => {
                                                    this.selectClientId(e.target.value);
                                                }}
                                            >
                                                <option value="">Select</option>
                                                {clientIdList &&
                                                    clientIdList.map((item, idex) => {
                                                        return <option value={item.id}> {item.name} </option>;
                                                    })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="itm">
                                    <div className="form-group select-group">
                                        <label className={`${showErrorBorder && errorParams.region_id ? "text-red " : ""}form-control-placeholder`}>
                                            Region *
                                        </label>
                                        <select
                                            className="form-control custom-selecbox"
                                            value={siteParams.region_id}
                                            onChange={e => {
                                                this.setState({
                                                    siteParams: {
                                                        ...siteParams,
                                                        region_id: e.target.value
                                                    }
                                                });
                                            }}
                                        >
                                            <option value="">Select</option>
                                            {regionIdList.length &&
                                                regionIdList.map((item, idex) => {
                                                    return <option value={item.id}> {item.name} </option>;
                                                })}
                                        </select>
                                    </div>
                                </div>

                                <div className="itm">
                                    <div className="form-group select-group">
                                        <label className="form-control-placeholder">Client User</label>
                                        <div className="custom-selecbox">
                                            <select className="form-control custom-selecbox">
                                                <option value="">Select</option>
                                                <option value="">Select</option>
                                                <option value="">Select</option>
                                                <option value="">Select</option>
                                                <option value="">Select</option>
                                                <option value="">Select</option>
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="itm">
                                    <div className="form-group select-group">
                                        <label className="form-control-placeholder">Consultancy User</label>
                                        <div className="custom-selecbox">
                                            <select className="form-control custom-selecbox">
                                                <option value="">Select</option>
                                                <option value="">Select</option>
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="itm">
                                    <div className="form-group">
                                        <label className="form-control-placeholder">Comments</label>
                                        <textarea
                                            type="text-area"
                                            value={siteParams.comments}
                                            onChange={e => {
                                                this.setState({
                                                    siteParams: {
                                                        ...siteParams,
                                                        comments: e.target.value
                                                    }
                                                });
                                            }}
                                            className="form-control"
                                            placeholder="Enter Comments"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="btn-sec">
                                <button className="btn btn-cncl-back mr-2" onClick={() => history.push("/sites")}>
                                    <i className="material-icons tic"> close</i>Cancel
                                </button>
                                {isEdit ? (
                                    <button className="btn btn-create" onClick={() => this.editSite()}>
                                        <i className="material-icons tic"> check</i> Update Site
                                    </button>
                                ) : (
                                    <button className="btn btn-create" onClick={() => this.addSite()}>
                                        <i className="material-icons tic"> check</i> Add Site
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    const { siteReducer, settingsCommonReducer } = state;
    return { siteReducer, settingsCommonReducer };
};

export default connect(mapStateToProps, { ...actions, ...commonActions })(editSite);
