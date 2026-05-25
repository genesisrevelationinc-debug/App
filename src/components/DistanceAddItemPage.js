import React, {View, Image, Text} from 'react-native';
import MapView from 'react-native-maps';
import {withOnyx} from 'react-native-onyx';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useCallback, useState, useEffect} from 'react';
import {useNavigation} from 'react-native';

const DistanceAddItemPage = () => {
    const [receiptImage, setReceiptImage] = useState(null);
    const [receiptPreview, setReceiptPreview] = useState(null);
    const [receiptPreviewURL, setReceiptPreviewURL] = useState('');
    const [receiptPreviewLoading, setReceiptPreviewLoading] = useState(false);
    const [receiptPreviewError, setReceiptPreviewError] = useState('');
    const [isSmallScreen