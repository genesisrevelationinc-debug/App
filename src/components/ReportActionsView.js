        return;
    }

    if (props.report.isArchivedRoom) {
        return <ArchivedRoomBanner />;
    }

    return (
        <View style={[styles.flex1, styles.justifyContentEnd]}>
            <ReportActionsList