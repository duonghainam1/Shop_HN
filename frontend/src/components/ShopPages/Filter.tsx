
const Filter = () => {
    return (
        <div className="filter">
            <div className="container">
                <div className="filter-block">
                    <div className="filter_box_left">
                        <div className="filter_box-icon">
                            <img src="img/của hàng/system-uicons_filtering.png" alt="" />
                            <p className="filter_name">Filter</p>
                            <img src="img/của hàng/ci_grid-big-round.png" alt="" />
                            <img src="img/của hàng/bi_view-list.png" alt="" />
                        </div>
                        <p className="filter_box-title">Showing 1–16 of 32 results</p>
                    </div>
                    <div className="filter_box_left">
                        <p className="box_name">Show</p>
                        <input type="text" className="show" placeholder="16" />
                        <p className="box_name">Default</p>
                        <input type="text" className="default" placeholder="Default" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Filter