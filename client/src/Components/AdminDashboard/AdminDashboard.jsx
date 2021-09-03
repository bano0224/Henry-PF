import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
  } from '@coreui/react'
// import { DocsLink } from 'src/reusable'

export function Admindashboard(props) {

    return (
        <CContainer>
            <CRow>
                <CCol xs="12" sm="6">
                <CCard>
                    <CCardHeader>
                    Credit Card
                    <small> Form</small>
                    {/* <DocsLink name="-Input"/> */}
                    </CCardHeader>
                    <CCardBody>
                    <CRow>
                        <CCol xs="12">
                        <CFormGroup>
                            <CLabel htmlFor="name">Name</CLabel>
                            <CInput id="name" placeholder="Enter your name" required />
                        </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                        <CFormGroup>
                            <CLabel htmlFor="ccnumber">Credit Card Number</CLabel>
                            <CInput id="ccnumber" placeholder="0000 0000 0000 0000" required />
                        </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="4">
                        <CFormGroup>
                            <CLabel htmlFor="ccmonth">Month</CLabel>
                            <CSelect custom name="ccmonth" id="ccmonth">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            </CSelect>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="4">
                        <CFormGroup>
                            <CLabel htmlFor="ccyear">Year</CLabel>
                            <CSelect custom name="ccyear" id="ccyear">
                            <option>2017</option>
                            <option>2018</option>
                            <option>2019</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            </CSelect>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="4">
                        <CFormGroup>
                            <CLabel htmlFor="cvv">CVV/CVC</CLabel>
                            <CInput id="cvv" placeholder="123" required/>
                        </CFormGroup>
                        </CCol>
                    </CRow>
                    </CCardBody>
                </CCard>
                </CCol>
                <CCol xs="12" sm="6">
                <CCard>
                    <CCardHeader>
                    Company
                    <small> Form</small>
                    </CCardHeader>
                    <CCardBody>
                    <CFormGroup>
                        <CLabel htmlFor="company">Company</CLabel>
                        <CInput id="company" placeholder="Enter your company name" />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="vat">VAT</CLabel>
                        <CInput id="vat" placeholder="DE1234567890" />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="street">Street</CLabel>
                        <CInput id="street" placeholder="Enter street name" />
                    </CFormGroup>
                    <CFormGroup row className="my-0">
                        <CCol xs="8">
                        <CFormGroup>
                            <CLabel htmlFor="city">City</CLabel>
                            <CInput id="city" placeholder="Enter your city" />
                        </CFormGroup>
                        </CCol>
                        <CCol xs="4">
                        <CFormGroup>
                            <CLabel htmlFor="postal-code">Postal Code</CLabel>
                            <CInput id="postal-code" placeholder="Postal Code" />
                        </CFormGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="country">Country</CLabel>
                        <CInput id="country" placeholder="Country name" />
                    </CFormGroup>
                    </CCardBody>
                </CCard>
                </CCol>
            </CRow>
        </CContainer>
        
    )
}

