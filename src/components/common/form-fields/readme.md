# levaral-react-components

## Checkbox

Usage:

```bash
import Checkbox from './form/Checkbox';

<Checkbox
    label="My Checkbox"
    name="my-checkbox"
    checked={this.form.checked}
    value={this.form.checked}
    onChange={e => this.form.checked = e.target.checked}
    error={(this.formError ? this.formError.checked : '')}
/>
```

## Radio

Usage:

```bash
 import Radio from './form/Radio';

 <Radio name="description"
       label="Description"
       value="asdf"
       checked = {this.form.description === 'asdf'}
       onChange={(e) => this.form.description = e.target.value}
 />
 <Radio name="description"
       label="Description 2"
       value="asdfg"
       checked = {this.form.description === 'asdfg'}
       onChange={(e) => this.form.description = e.target.value}
 />
```

## Input

Usage: default layout

```bash
import Input from './form/Input';

<Input
    label="Description"
    placeholder="text"
    value={this.form.description}
    error={(this.formError ? this.formError.company_name : '')}
    onChange={e => this.form.description = e.target.value}
    type="text"
    required={true}
/>
```

Usage: side-by-side layout

```bash
<Input
    wrapperClass="row form-group"
    label="E-mail Address"
    labelClass="col-md-4 control-label"
    columnClass="col-md-8"
    placeholder="Enter e-mail address"
    value={this.form.email}
    error={(this.formError ? this.formError.email : '')}
    onChange={(e) => this.form.email = e.target.value}
    type="email"
    required={true}
/>
```

## Select

Usage:

```bash
import Select from './form/Select';

<Select
    placeholder="please select one"
    label="Description"
    value={this.form.description}
    error={(this.formError ? this.formError.description : '')}
    onChange={e => this.form.description = e.target.value}
    options={[{title: 'first', value: '1'},{title: 'second', value: '2'},{title: 'third', value: '3'}]}
/>
```

## MultiSelect

Usage:

```bash
import MultiSelect from "./form/MultiSelect";

<MultiSelect label="Tags"
             placeholder="Select Tags"
             options={this.options.peek()}
             onChange={(value) => this.form.tags = value}
             value={this.form.tags.peek()}
             error={(this.formError ? this.formError.tags : '')}
/>
```

## Textarea

Usage:

```bash
import Textarea from './form/Textarea';

<Textarea
    label="Description"
    value={this.form.description}
    error={(this.formError ? this.formError.description : '')}
    onChange={e => this.form.description = e.target.value}
/>
```

##DropDown Percentage

Usage:

```
<DropDownPercentage
    label={'Test'}
    placeholder={'please select one'}
    error={''}
    value={this.value}
    onValueChange={(current, allSelected) => {
        console.log(allSelected);
    }}
    onChange={(value) => this.value = value}
    options={[{title: 'first', value: '1'},{title: 'second', value: '2'},{title: 'third', value: '3'}]}
/>
```

##Google AutoComplete With MultiSelect

Usage:

```
<GoogleAutoComplete
    style={{width: '90%'}}
    onPlaceChange={(current, allSelected) => {
        console.log(allSelected);
    }}
    //multiple={true}
    //selectedValues={[{formatted_address: 'rajkot'}, {formatted_address: 'jamnagar'}, {formatted_address: 'vadodara'}]}
    //autocompleteValue='Rajkot'
    //types={['(regions)']}
    //componentRestrictions={{country: "ru"}}
/>
```

##FileUpload

Usage:

```
<FileUpload key='ex1' url='http://spoddle.test'
    onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
    onLoad={ (e, request) => {console.log('load', e, request);}}
    onError={ (e, request) => {console.log('error', e, request);}}
    onAbort={ (e, request) => {console.log('abort', e, request);}}
/>
```


## MultipleFileUpload

Usage:

```bash
import MultipleFileUpload from "./form/MultipleFileUpload";

<MultipleFileUpload
    pageStore = {pageStore}
    url='/api/upload'
    auto
    fieldName="message_file"
    maxFiles={10}
    onLoad={ (value) => {this.onLoad(value) }}
/>
```

## RangeSlider

Usage:

```bash
import RangeSlider from "./form/RangeSlider";

<RangeSlider style={{ width: 600, margin: 50 }}
             value={this.form.value}
             min={0}
             max={100}
             step={1}
             leftIcon="Male"
             rightIcon="Female"
             onChange={(value) => this.form.value = value}
/>
```

## TinyMCE TextEditor

Usage:

```bash
import TinymceEditor from "./form/TinymceEditor";

    <TinymceEditor
        apiKey={YOUR_TINYMCE_API_KEY}
        config={{
            height: 500,
            plugins: 'image table'
        }}
        content={`<p>This is some HTML</p>`}
        onContentChanged={content => console.log(content)}
    />
```

## Button loader

Usage:

```bash
import ButtonLoader from "./form/ButtonLoader";

    <ButtonLoader className="btn btn-primary btn-filled"
        loading={this.isLoading}
        onClick={(e) => }>
        Save & Continue
    </ButtonLoader>
```


## InputDatePicker
Usage:

```bash
import InputDatePicker from "./form/InputDatePicker";
<InputDatePicker
    label="Required By "
    placeholder="Select start date"
    dateFormat="DD/MM/YYYY"
    value={this.form.date}
    onChange={(date) => this.form.date = date.format('YYYY-MM-DD')}
    error={(this.formError ? this.formError.required_by : '')}
/>
```

## Action
Usage:

```bash
import Action from "./Action";
<Action className="btn btn-sm btn-success" title="Approve" onClick={(e) => this.onApprove(cellInfo)}>
    <i className="fa fa-check"/>
</Action>
```
## Action
Usage:

```bash
import Link from "./Link";

<Link page={new UserCreatePage('sponsor')}
      pageStore={pageStore}
      className="nav-link">
    <i className="fa fa-plus-square" aria-hidden="true"/> ProductCreate
</Link>
```

## InfiniteScroll
Usage:

```bash
import InfiniteScroll from "./InfiniteScroll";
loadItems(page) {
   this.props.page.loadItems(page);
}
    
<InfiniteScroll
    pageStart={1}
    isRestart={page.isRestart}
    loadMore={this.loadItems.bind(this)}
    hasMore={page.hasMoreItems}
    loader={loader}
    initialLoad={true}>
    <div className="row lesspad mt20">
        {
            page.models.length ? page.models.peek().map((model, i) =>
                <Model page={page} key={i} model={model} pageStore={pageStore}/>
            ) : <div className="blank-event-venue"> no records found </div>
        }
    </div>
</InfiniteScroll>
```

## Map
Usage:

```bash
import Map from "./Map";
<Map 
    latitude={page.venue.latitude} 
    longitude={page.venue.longitude}
/>
```     

## ReactStripeCheckout
Usage:

```bash
import ReactStripeCheckout  from "./ReactStripeCheckout";
@observable selectedPlan = '';
onToken = (token) => {
    this.props.page.onGetPlan(token.id, this.selectedPlan);
};

onOpened = (plan) => {
    this.selectedPlan = plan.name;
};
<ReactStripeCheckout
    name='Spoddle'
    image='/images/logo-spoddle-70-70.png'
    token={(token) => this.onToken(token)}
    amount={parseFloat(plan.amount) * 100}
    currency="EUR"
    email='
    opened={(e) => this.onOpened(plan)}
    stripeKey={stripeKey}
>
    <button className="btn btn-primary btn-filled">Upgrade</button>
</ReactStripeCheckout>
```

## Complex forms ref (addmore type)

Usage:

```bash
https://goshakkk.name/array-form-inputs/
```

## Table Grid

Usage:

```bash
import TableGrid  from "./TablePagination/TableGrid";

constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.refReactTable = null;
};

checkboxState(state) {
    this.checkBox.rowState = state.rowState;
    this.checkBox.checkAll = state.checked;
}

fetchData(state) {
    this.loading = true;
    this.props.page.changeCurrPage(
        state.currentPage,
        state.sorted,
        state.perPage,
        this.form,      //optional
        (status, res) => {
            if (status) {
                this.pages = res.pages;
                this.currentPage = res.currentPage;
                this.data = res.rows;
                this.loading = false;
                this.onLoad();
            }
        }
    );
}
    
setCheckAll() {
    let rowState = this.checkBox.rowState;
    if (!this.loading) {
        this.checkBox.checkAll = true;
        this.data.peek().map((item, i) => {
            let selected = rowState.find(function (ele) {
                return ele === item.id;
            });
            if (!selected) {
                this.checkBox.checkAll = false;
            }
        });
    }
}

<TableGrid
    ref={(refReactTable) => {
        this.refReactTable = refReactTable;
    }}
    data={this.data}
    columns={[
        {
            Header: "Id",
            accessor: "id",
            width: 40,
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Action",
            width: 100,
            accessor: d =>
                <div>
                    <Link pageStore={pageStore}
                          className="btn btn-sm btn-primary">
                        <i className="fa fa-pencil"/>
                    </Link>
                </div>
        },
    ]}
    pages={this.pages}
    onFetchData={this.fetchData} // request new data when things change
    currentPage={this.currentPage}
    loading={this.loading}
    needCheckBox={true}
    checkCallback={(state) => this.checkboxState(state)} // set state/variables for checkbox
    rowState={this.checkBox.rowState}
    checkAll={this.checkBox.checkAll}
    alignPagination='left'
    perPage={3}
    className='table-bordered table-hover'
    showPagination={true}
/>

//when outer action performed call:

this.refReactTable.fireFetchData()  
```