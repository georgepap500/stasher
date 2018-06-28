import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';

import { fetchPoints } from './_actions';

class StashPoints extends Component {
	constructor(props) {
		super(props);

		this.state = {
			resultsNo: 10,
			page: 1,
			stashPoints: [],
			sort: {
				enabled: false,
				type: 'none',
				by: 'asc'
			},
			open_late: false,
			only_active: false
		} ;

		this.handleScroll = this.handleScroll.bind(this);
		this.handleSortChange = this.handleSortChange.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.fetchNewPoints = this.fetchNewPoints.bind(this);
	}

	handleScroll(event) {
		if(document.getElementById("endOfPage").getBoundingClientRect().bottom - window.innerHeight <= 400) {
			if(this.state.stashPoints.length > this.state.resultsNo)
				this.setState({resultsNo: this.state.resultsNo + 10});
		}
	}

	fetchNewPoints() {
		let params = '';
		let isFirst = true;
		if(this.state.sort.enabled) {
			if(isFirst) {
				params += '?';
				isFirst = false;
			}
			params += this.state.sort.type + '=' +  this.state.sort.by ;
		}
		if(this.state.open_late) {
			if(isFirst) {
				params += '?'
				isFirst = false;
			} else {
				params += '&';
			}
			params += 'open_late=true' ;
		}
		if(this.state.only_active) {
			if(isFirst) {
				params += '?'
				isFirst = false;
			} else {
				params += '&';
			}
			params += 'active=true' ;
		}

		this.props
		.fetchPoints(params)
		.then(response => {
			this.setState( {stashPoints:
				response.data
			});
			// console.log(this.state.stashPoints);
		})
		.catch(error => {});
	}

	handleSortChange(event) {
		const name = event.target.name ;
		if(name === 'sort_type') {
			if(event.target.value === 'none') {
				this.setState({sort: { enabled: false, type: 'none', by: this.state.sort.by }}, this.fetchNewPoints);
			} else {
				this.setState({sort: { enabled: true, type: event.target.value, by: this.state.sort.by}}, this.fetchNewPoints);
			}
		} else if (name === 'sort_by') {
			this.setState({sort: { enabled: this.state.sort.enabled, type: this.state.sort.type, by: event.target.value}}, this.fetchNewPoints);
		}
	}

	handleFilterChange(event) {
		const name = event.target.name ;
		if(name === 'open_late') {
			this.setState({open_late: !this.state.open_late}, this.fetchNewPoints);
		} else if (name === 'only_active') {
			this.setState({only_active: !this.state.only_active}, this.fetchNewPoints);
		}
	}

	componentDidMount() {
		document.addEventListener('scroll', this.handleScroll);
		this.fetchNewPoints() ;
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.handleScroll);
	}

	render() {
		return (
			<div className="stash-points-wrapper">
				<div className="sort-control-wrapper">
					<form>
						<div className="form-group">
							<label className="mr-5">
								Open Late
								<input className="ml-1" name="open_late" type="checkbox" checked={this.state.open_late} onChange={this.handleFilterChange} />
							</label>
							<label>
								Only Active
								<input className="ml-1" name="only_active" type="checkbox" checked={this.state.only_active} onChange={this.handleFilterChange} />
							</label>
						</div>
					</form>
					<form>
						<div className="form-group">
							<label>
								Sort By: 
								<select className="ml-2" name="sort_type" value={this.state.sort.type} onChange={this.handleSortChange}>
									<option value="none">Default</option>
									<option value="by_bags_last_30_days">Popularity</option>
									<option value="by_capacity">Capacity</option>
								</select>
								<select className="ml-2" name="sort_by" value={this.state.sort.by} onChange={this.handleSortChange}>
									<option value="asc">Ascending</option>
									<option value="desc">Descending</option>
								</select>
							</label>
						</div>
					</form>
				</div>
				<div className="stash-point-cards-wrapper">
					{this.state
					.stashPoints
					.filter((element, i) =>
					 	(i < this.state.resultsNo))
					.map((info, i) =>
						<div className="stash-point-card d-flex flex-column mt-1 mb-1" key={i}>
							<div className="top-part d-flex justify-content-between p-4">
								<div className="left-part d-flex">
									<div className="stash-point-photo-small mr-2" src={info.photos[0]} style={{backgroundImage: `url(${info.photos[0]})`}}/>
									<div className="opening-hours d-flex flex-column">
										<strong>{info.name}</strong>
										<span>{info.location_name}</span>
									</div>
								</div>
								<div className="right-part d-flex flex-column">
									{info.open_late ?
										<span className="special-open">OPEN LATE</span>
										: (info.open_twentyfour_seven &&
											<span className="special-open">24/7</span>
										)
									}
									<div>
								</div>
							</div>
						</div>
						<div className="bottom-part d-flex justify-content-center">
							<span className="prices p-4">&#163;{(info.pricing_structure.first_day_cost/100.0).toFixed(2)} on first 24h - &#163;{(info.pricing_structure.extra_day_commission/100.0).toFixed(2)} on extra 24h</span>
							<a className="option justify-content-center align-items-center" href="#"><span>Quick view</span></a>
							<a className="option justify-content-center align-items-center" href="#"><span>View details</span></a>
						</div>
					</div>
					)}
				</div>
				<div id="endOfPage" />
			</div>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { fetchPoints })(StashPoints);